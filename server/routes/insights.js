const express = require("express");
const { body, validationResult, query } = require("express-validator");
const Insight = require("../models/Insight");
const { authenticateToken, requireEditor } = require("../middleware/auth");

const router = express.Router();

// Validation rules for creating/updating insights
const insightValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("excerpt")
    .trim()
    .notEmpty()
    .withMessage("Excerpt is required")
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ max: 100 })
    .withMessage("Author name cannot exceed 100 characters"),
  body("category")
    .isIn([
      "Technology",
      "Business",
      "Innovation",
      "Industry",
      "Research",
      "Analysis",
    ])
    .withMessage("Invalid category"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("tags.*")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Each tag cannot exceed 50 characters"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("SEO title cannot exceed 60 characters"),
  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("SEO description cannot exceed 160 characters"),
];

// Helper function to calculate read time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

// @route   GET /api/insights
// @desc    Get all published insights (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      sort = "newest",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build query for published insights
    let query = { published: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case "oldest":
        sortOption = { publishedAt: 1 };
        break;
      case "popular":
        sortOption = { views: -1, likes: -1 };
        break;
      case "newest":
      default:
        sortOption = { publishedAt: -1 };
        break;
    }

    const insights = await Insight.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .select("-content"); // Exclude full content for list view

    const total = await Insight.countDocuments(query);

    res.json({
      success: true,
      data: {
        insights,
        pagination: {
          current: pageNumber,
          pages: Math.ceil(total / limitNumber),
          total,
          hasNext: pageNumber < Math.ceil(total / limitNumber),
          hasPrev: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get insights error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching insights",
    });
  }
});

// @route   GET /api/insights/admin
// @desc    Get all insights for admin (including unpublished)
// @access  Private (Editor+)
router.get("/admin", authenticateToken, requireEditor, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status = "all",
      category,
      search,
      sort = "newest",
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build query
    let query = {};

    if (status === "published") {
      query.published = true;
    } else if (status === "draft") {
      query.published = false;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "updated":
        sortOption = { updatedAt: -1 };
        break;
      case "popular":
        sortOption = { views: -1, likes: -1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const insights = await Insight.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const total = await Insight.countDocuments(query);

    res.json({
      success: true,
      data: {
        insights,
        pagination: {
          current: pageNumber,
          pages: Math.ceil(total / limitNumber),
          total,
          hasNext: pageNumber < Math.ceil(total / limitNumber),
          hasPrev: pageNumber > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get admin insights error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching insights",
    });
  }
});

// @route   GET /api/insights/:id
// @desc    Get single insight by ID
// @access  Public (published) / Private (unpublished)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { preview } = req.query;

    let insight;

    if (preview === "true") {
      // Preview mode - check authentication
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authentication required for preview",
        });
      }

      // Get insight regardless of published status
      insight = await Insight.findById(id);
    } else {
      // Public access - only published insights
      insight = await Insight.findOne({ _id: id, published: true });
    }

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    // Increment views for published insights (not in preview mode)
    if (insight.published && preview !== "true") {
      await insight.incrementViews();
    }

    res.json({
      success: true,
      data: insight,
    });
  } catch (error) {
    console.error("Get insight error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching insight",
    });
  }
});

// @route   POST /api/insights
// @desc    Create new insight
// @access  Private (Editor+)
router.post(
  "/",
  authenticateToken,
  requireEditor,
  insightValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const insightData = {
        ...req.body,
        readTime: calculateReadTime(req.body.content),
      };

      const insight = new Insight(insightData);
      await insight.save();

      res.status(201).json({
        success: true,
        message: "Insight created successfully",
        data: insight,
      });
    } catch (error) {
      console.error("Create insight error:", error);

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "An insight with this slug already exists",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error while creating insight",
      });
    }
  }
);

// @route   PUT /api/insights/:id
// @desc    Update insight
// @access  Private (Editor+)
router.put(
  "/:id",
  authenticateToken,
  requireEditor,
  insightValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const updateData = {
        ...req.body,
        readTime: calculateReadTime(req.body.content),
      };

      const insight = await Insight.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!insight) {
        return res.status(404).json({
          success: false,
          message: "Insight not found",
        });
      }

      res.json({
        success: true,
        message: "Insight updated successfully",
        data: insight,
      });
    } catch (error) {
      console.error("Update insight error:", error);

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "An insight with this slug already exists",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error while updating insight",
      });
    }
  }
);

// @route   DELETE /api/insights/:id
// @desc    Delete insight
// @access  Private (Editor+)
router.delete("/:id", authenticateToken, requireEditor, async (req, res) => {
  try {
    const { id } = req.params;

    const insight = await Insight.findByIdAndDelete(id);

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    res.json({
      success: true,
      message: "Insight deleted successfully",
    });
  } catch (error) {
    console.error("Delete insight error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting insight",
    });
  }
});

// @route   PATCH /api/insights/:id/publish
// @desc    Toggle publish status
// @access  Private (Editor+)
router.patch(
  "/:id/publish",
  authenticateToken,
  requireEditor,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { published } = req.body;

      const insight = await Insight.findById(id);

      if (!insight) {
        return res.status(404).json({
          success: false,
          message: "Insight not found",
        });
      }

      insight.published = published;
      if (published && !insight.publishedAt) {
        insight.publishedAt = new Date();
      }

      await insight.save();

      res.json({
        success: true,
        message: `Insight ${
          published ? "published" : "unpublished"
        } successfully`,
        data: insight,
      });
    } catch (error) {
      console.error("Publish insight error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating publish status",
      });
    }
  }
);

// @route   GET /api/insights/categories/stats
// @desc    Get category statistics
// @access  Public
router.get("/categories/stats", async (req, res) => {
  try {
    const stats = await Insight.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get category stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching category statistics",
    });
  }
});

module.exports = router;
