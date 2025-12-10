const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { body, validationResult } = require("express-validator");
const Insight = require("../models/Insight");
const { authenticateToken, requireEditor } = require("../middleware/auth");

const router = express.Router();

// Configure multer for PDF upload (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
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
  const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  
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
        const author = match[1].trim()
          .replace(/[^\w\s.-]/g, '') // Remove special characters except dots and hyphens
          .replace(/\s+/g, ' ')
          .trim();
        
        // Validate author name (should be reasonable length)
        if (author.length >= 2 && author.length <= 50 && /[a-zA-Z]/.test(author)) {
          return author;
        }
      }
    }
  }
  
  // Look for potential author names in first paragraph
  // Names often appear as "FirstName LastName" patterns
  const firstParagraph = lines.slice(0, 5).join(' ');
  const namePattern = /\b[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g;
  const matches = firstParagraph.match(namePattern);
  
  if (matches && matches.length > 0) {
    // Return the first reasonable name found
    for (const match of matches) {
      if (match.length <= 50 && !match.includes('PDF') && !match.includes('Document')) {
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
  upload.single("pdf"),
  insightUploadValidation,
  async (req, res) => {
    try {
      console.log(
        "PDF Upload Request - User:",
        req.user?.username,
        "Role:",
        req.user?.role
      );

      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "PDF file is required",
        });
      }

      const { featuredImage, publishDate } = req.body;

      // Parse PDF to extract text
      let pdfText = "";
      try {
        const pdfData = await pdfParse(req.file.buffer);
        pdfText = pdfData.text;
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return res.status(400).json({
          success: false,
          message: "Invalid PDF file or corrupted content",
        });
      }

      if (!pdfText.trim()) {
        return res.status(400).json({
          success: false,
          message: "PDF appears to be empty or contains no readable text",
        });
      }

      // Extract metadata from PDF
      const title = extractTitleFromPdf(pdfText);
      const excerpt = generateExcerpt(pdfText);
      const author = extractAuthorFromPdf(pdfText);

      // Convert PDF to base64 for storage
      const pdfBase64 = req.file.buffer.toString("base64");

      // Create insight document
      const insightData = {
        title,
        excerpt,
        author: author || 'Unknown Author',
        category: 'Research', // Default category for PDF uploads
        pdfData: pdfBase64,
        pdfFilename: req.file.originalname,
        pdfSize: req.file.size,
        featuredImage:
          featuredImage ||
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        published: true, // Auto-publish PDF insights
      };

      const insight = new Insight(insightData);
      await insight.save();

      // Return without PDF data to avoid large response
      const responseData = { ...insight.toObject() };
      delete responseData.pdfData;

      res.status(201).json({
        success: true,
        message: "PDF insight created successfully",
        data: responseData,
      });
    } catch (error) {
      console.error("Upload insight error:", error);

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

    const insight = await Insight.findById(id).select(
      "pdfData pdfFilename published"
    );

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    if (!insight.published) {
      return res.status(403).json({
        success: false,
        message: "This insight is not published",
      });
    }

    if (!insight.pdfData) {
      return res.status(404).json({
        success: false,
        message: "PDF data not found",
      });
    }

    // Convert base64 back to buffer
    const pdfBuffer = Buffer.from(insight.pdfData, "base64");

    // Set appropriate headers
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition":
        download === "true"
          ? `attachment; filename="${insight.pdfFilename}"`
          : `inline; filename="${insight.pdfFilename}"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF serve error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while serving PDF",
    });
  }
});

module.exports = router;
