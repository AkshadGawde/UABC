const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { body, validationResult } = require("express-validator");
const Insight = require("../models/Insight");
const { authenticateToken, requireEditor } = require("../middleware/auth");

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
        req.files ? Object.keys(req.files) : "none"
      );

      if (req.files) {
        if (req.files.pdf)
          console.log(
            "  - PDF:",
            req.files.pdf[0].originalname,
            `(${req.files.pdf[0].size} bytes)`
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

      const { featuredImage, publishDate, category } = req.body;
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
          "characters"
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
      const title = extractTitleFromPdf(pdfText);
      const excerpt = generateExcerpt(pdfText);
      const author = extractAuthorFromPdf(pdfText);

      console.log("📝 Extracted metadata:");
      console.log("  - Title:", title);
      console.log("  - Author:", author || "Unknown");
      console.log("  - Excerpt length:", excerpt.length);

      // Convert PDF to base64 for storage
      const pdfBase64 = pdfFile.buffer.toString("base64");

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
        category: category || "General", // Use category from form or default to General
        pdfData: pdfBase64,
        pdfFilename: pdfFile.originalname,
        pdfSize: pdfFile.size,
        featuredImage: finalImageUrl,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        published: true, // Auto-publish PDF insights
      };

      console.log("💾 Saving to database...");
      const insight = new Insight(insightData);
      await insight.save();
      console.log("✅ Insight saved successfully:", insight._id);

      // Return without PDF data to avoid large response
      const responseData = { ...insight.toObject() };
      delete responseData.pdfData;

      res.status(201).json({
        success: true,
        message: "PDF insight created successfully",
        data: responseData,
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
  }
);

// @route   GET /api/insights/:id/pdf
// @desc    Download or view PDF
// @access  Public (for published insights)
router.get("/:id/pdf", async (req, res) => {
  try {
    const { id } = req.params;
    const { download = "false" } = req.query;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.warn("Invalid MongoDB ID format:", id);
      return res.status(400).json({
        success: false,
        message: "Invalid insight ID format",
      });
    }

    const insight = await Insight.findById(id).select(
      "pdfData pdfFilename published"
    );

    if (!insight) {
      console.warn("Insight not found:", id);
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    if (!insight.published) {
      console.warn("Insight not published:", id);
      return res.status(403).json({
        success: false,
        message: "This insight is not published",
      });
    }

    if (!insight.pdfData) {
      console.warn("PDF data not found for insight:", id);
      return res.status(404).json({
        success: false,
        message: "PDF data not found for this insight",
      });
    }

    // Validate pdfData is a valid string
    if (typeof insight.pdfData !== 'string') {
      console.error("Invalid pdfData type:", typeof insight.pdfData);
      return res.status(500).json({
        success: false,
        message: "PDF data is corrupted",
      });
    }

    let pdfBuffer;
    try {
      // Convert base64 back to buffer
      pdfBuffer = Buffer.from(insight.pdfData, "base64");
      
      // Validate buffer size (max 50MB)
      if (pdfBuffer.length > 50 * 1024 * 1024) {
        console.error("PDF size exceeds limit:", pdfBuffer.length);
        return res.status(413).json({
          success: false,
          message: "PDF file is too large",
        });
      }
    } catch (bufferError) {
      console.error("Buffer conversion error:", bufferError);
      return res.status(500).json({
        success: false,
        message: "Failed to process PDF data",
      });
    }

    // Set appropriate headers with CORS
    const filename = insight.pdfFilename || `insight-${id}.pdf`;
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition":
        download === "true"
          ? `attachment; filename="${filename}"`
          : `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    });

    console.log(`Serving PDF: ${filename} (${pdfBuffer.length} bytes)`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF serve error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while serving PDF",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
