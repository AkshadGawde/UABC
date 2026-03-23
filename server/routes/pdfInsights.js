const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { body, validationResult } = require("express-validator");
const Insight = require("../models/Insight");
const { authenticateToken, requireEditor } = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Configure multer for PDF and image upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "pdf") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("PDF field must contain a PDF file"), false);
      }
    } else if (file.fieldname === "image") {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Image field must contain an image file"), false);
      }
    } else {
      cb(new Error("Unexpected field"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for both PDF and images
  },
});

// Validation for insight upload
const insightUploadValidation = [
  body("publishDate")
    .optional()
    .isISO8601()
    .withMessage("Publish date must be a valid date"),
  body("featuredImage")
    .optional()
    .isURL()
    .withMessage("Featured image must be a valid URL"),
];

// Helper function to extract title from PDF text
const extractTitleFromPdf = (text) => {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);

  // Try to find the first substantial line as title
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 5 && trimmed.length < 200) {
      // Remove common PDF artifacts
      const cleaned = trimmed
        .replace(/^\d+\.\s*/, "") // Remove numbering
        .replace(/^[^\w]*/, "") // Remove leading non-word chars
        .trim();

      if (cleaned.length > 5) {
        return cleaned;
      }
    }
  }

  return "Untitled Insight";
};

// Helper function to generate excerpt from PDF text
const generateExcerpt = (text) => {
  const cleaned = text
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/[^\w\s.,!?-]/g, "") // Remove special chars
    .trim();

  if (cleaned.length <= 300) return cleaned;

  // Find a good break point near 300 chars
  const truncated = cleaned.substring(0, 300);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 200
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
};

// Helper function to create a URL-safe slug from text
const slugify = (text) => {
  if (!text) return "untitled-pdf";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .slice(0, 80); // Max length for Cloudinary public_id (leaving room for randomness if needed)
};

// Helper function to extract author from PDF text
const extractAuthorFromPdf = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Common author patterns to look for
  const authorPatterns = [
    /^(?:by|author|written by|authored by)[:]\s*(.+)$/i,
    /^author[:]\s*(.+)$/i,
    /^by\s+(.+)$/i,
    /^(.+)\s*-\s*author$/i,
    /^dr\.?\s+(.+)$/i,
    /^prof\.?\s+(.+)$/i,
    /^(.+),\s*(?:phd|md|dr|prof)\.?$/i,
  ];

  // Check first few lines for author patterns
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];

    for (const pattern of authorPatterns) {
      const match = line.match(pattern);
      if (match && match[1]) {
        const author = match[1]
          .trim()
          .replace(/[^\w\s.-]/g, "") // Remove special characters except dots and hyphens
          .replace(/\s+/g, " ")
          .trim();

        // Validate author name (should be reasonable length)
        if (
          author.length >= 2 &&
          author.length <= 50 &&
          /[a-zA-Z]/.test(author)
        ) {
          return author;
        }
      }
    }
  }

  // Look for potential author names in first paragraph
  // Names often appear as "FirstName LastName" patterns
  const firstParagraph = lines.slice(0, 5).join(" ");
  const namePattern = /\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g;
  const matches = firstParagraph.match(namePattern);

  if (matches && matches.length > 0) {
    // Return the first reasonable name found
    for (const match of matches) {
      if (
        match.length <= 50 &&
        !match.includes("PDF") &&
        !match.includes("Document")
      ) {
        return match.trim();
      }
    }
  }

  return null; // No author found
};

// @route   POST /api/insights/upload
// @desc    Upload PDF and create new insight
// @access  Private (Editor+)
router.post(
  "/upload",
  authenticateToken,
  requireEditor,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  insightUploadValidation,
  async (req, res) => {
    try {
      console.log("📄 PDF Upload Request Started");
      console.log("- User:", req.user?.username, "Role:", req.user?.role);
      console.log(
        "- Files received:",
        req.files ? Object.keys(req.files) : "none",
      );

      if (req.files) {
        if (req.files.pdf)
          console.log(
            "  - PDF:",
            req.files.pdf[0].originalname,
            `(${req.files.pdf[0].size} bytes)`,
          );
        if (req.files.image)
          console.log("  - Image:", req.files.image[0].originalname);
      }

      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("❌ Validation errors:", errors.array());
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      if (!req.files || !req.files.pdf || !req.files.pdf[0]) {
        console.log("❌ No PDF file provided");
        return res.status(400).json({
          success: false,
          message: "PDF file is required",
        });
      }

      const { featuredImage, publishDate, category, customTitle } = req.body;
      const pdfFile = req.files.pdf[0];
      const imageFile = req.files.image ? req.files.image[0] : null;

      console.log("📖 Parsing PDF content...");

      // Parse PDF to extract text
      let pdfText = "";
      try {
        const pdfData = await pdfParse(pdfFile.buffer);
        pdfText = pdfData.text;
        console.log(
          "✅ PDF parsed successfully:",
          pdfText.length,
          "characters",
        );
      } catch (pdfError) {
        console.error("❌ PDF parsing error:", pdfError);
        return res.status(400).json({
          success: false,
          message: "Invalid PDF file or corrupted content",
        });
      }

      if (!pdfText.trim()) {
        console.log("❌ PDF appears empty");
        return res.status(400).json({
          success: false,
          message: "PDF appears to be empty or contains no readable text",
        });
      }

      // Extract metadata from PDF
      // Use customTitle if provided, otherwise extract from PDF
      const title = customTitle && customTitle.trim() ? customTitle.trim() : extractTitleFromPdf(pdfText);
      const excerpt = generateExcerpt(pdfText);
      const author = extractAuthorFromPdf(pdfText);

      console.log("📝 Extracted metadata:");
      console.log("  - Title:", title);
      console.log("  - Author:", author || "Unknown");
      console.log("  - Excerpt length:", excerpt.length);

      // Convert PDF buffer to base64
      const base64Pdf = `data:application/pdf;base64,${pdfFile.buffer.toString("base64")}`;

      // Create a URL-safe slug from the title for the PDF filename
      const pdfSlug = slugify(title);
      console.log("  - PDF Slug/Filename:", pdfSlug);

      // Upload to Cloudinary with proper filename
      const uploadResult = await cloudinary.uploader.upload(base64Pdf, {
        resource_type: "auto", // Auto-detect PDF type
        folder: "insights-pdfs",
        public_id: pdfSlug, // Use slugified title as the filename
        access_mode: "public",
        flags: "immutable", // Cache the file permanently
      });

      const pdfUrl = uploadResult.secure_url;

      console.log("🔗 PDF URL from Cloudinary:", pdfUrl);
      console.log("✅ PDF will download as:", `${pdfSlug}.pdf`);

      // Handle image - either uploaded file or URL
      let finalImageUrl;
      if (imageFile) {
        // Convert uploaded image to base64 data URL
        const imageBase64 = imageFile.buffer.toString("base64");
        finalImageUrl = `data:${imageFile.mimetype};base64,${imageBase64}`;
        console.log("🖼️  Using uploaded image");
      } else if (featuredImage) {
        finalImageUrl = featuredImage;
        console.log("🖼️  Using image URL:", featuredImage);
      } else {
        finalImageUrl =
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80";
        console.log("🖼️  Using default image");
      }

      // Create insight document
      const insightData = {
        title,
        excerpt,
        author: author || "Unknown Author",
        category: category || "General",
        pdfUrl: pdfUrl,
        featuredImage: finalImageUrl,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        published: true,
      };

      console.log("💾 Saving to database...");
      const insight = new Insight(insightData);
      await insight.save();
      console.log("✅ Insight saved successfully:", insight._id);

      res.status(201).json({
        success: true,
        message: "PDF insight created successfully",
        data: insight.toObject(),
      });
    } catch (error) {
      console.error("❌ Upload insight error:", error);

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "An insight with this title already exists",
        });
      }

      if (error.message === "Only PDF files are allowed") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed",
        });
      }

      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size too large. Maximum size is 10MB",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error while uploading PDF",
      });
    }
  },
);

// @route   DELETE /api/pdf-insights/:id
// @desc    Delete a PDF insight (removes from MongoDB and Cloudinary)
// @access  Private (Editor+)
router.delete("/:id", authenticateToken, requireEditor, async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️  Delete PDF Insight Request");
    console.log("- Insight ID:", id);
    console.log("- User:", req.user?.username, "Role:", req.user?.role);

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid insight ID format",
      });
    }

    // Find the insight first to get the Cloudinary URL
    const insight = await Insight.findById(id);

    if (!insight) {
      console.log("❌ Insight not found:", id);
      return res.status(404).json({
        success: false,
        message: "PDF insight not found",
      });
    }

    // Delete from Cloudinary if PDF URL exists
    if (insight.pdfUrl) {
      try {
        // Extract public_id from URL using regex for accuracy
        // URL format: https://res.cloudinary.com/.../upload/.../insights/filename.pdf
        // Extract everything after /upload/ up to the file extension
        const matches = insight.pdfUrl.match(
          /upload\/(?:v\d+\/)?(.+?)(\.\w+)?$/,
        );
        if (matches) {
          const publicId = matches[1]; // This will be "insights/qtpczupsrkyinygdudhc"

          console.log("📤 Deleting from Cloudinary:", publicId);

          await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto",
          });

          console.log("✅ Deleted from Cloudinary:", publicId);
        }
      } catch (cloudinaryError) {
        console.error(
          "⚠️  Cloudinary deletion warning:",
          cloudinaryError.message,
        );
        // Don't fail the entire operation if Cloudinary deletion fails
        // Continue with MongoDB deletion
      }
    }

    // Delete from MongoDB
    await Insight.findByIdAndDelete(id);

    console.log("✅ Insight deleted from MongoDB:", id);

    res.json({
      success: true,
      message: "PDF insight deleted successfully",
      data: { id: insight._id },
    });
  } catch (error) {
    console.error("❌ Delete insight error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting PDF insight",
    });
  }
});

// @route   GET /api/pdf-insights/:id/pdf
// @desc    Get clean PDF URL for viewing in browser
// @access  Public (for published insights)
router.get("/:id/pdf", async (req, res) => {
  try {
    const { id } = req.params;

    const insight = await Insight.findById(id).select("pdfUrl published");

    if (!insight || !insight.published) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (!insight.pdfUrl) {
      return res.status(404).json({
        success: false,
        message: "PDF URL not found for this insight",
      });
    }

    // Return the stored PDF URL directly (already clean from Cloudinary)
    // Format: https://res.cloudinary.com/cloud/image/upload/v1234/insights-pdfs/filename.pdf
    console.log("📄 Serving PDF URL:", insight.pdfUrl);

    res.json({
      success: true,
      pdfUrl: insight.pdfUrl,
    });
  } catch (error) {
    console.error("PDF serve error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while serving PDF",
    });
  }
});

module.exports = router;
