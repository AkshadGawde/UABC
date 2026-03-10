const express = require("express");
const { body, validationResult } = require("express-validator");
const Insight = require("../models/Insight");
const { authenticateToken, requireEditor } = require("../middleware/auth");

const router = express.Router();

/* -------------------------------- */
/* Helper - calculate read time     */
/* -------------------------------- */

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

/* -------------------------------- */
/* GET /api/insights                */
/* -------------------------------- */

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const query = { published: true };

    const insights = await Insight.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-content")
      .lean();

    const total = await Insight.countDocuments(query);

    res.json({
      success: true,
      data: {
        insights,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
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

/* -------------------------------- */
/* GET SINGLE INSIGHT               */
/* -------------------------------- */

router.get("/:id", async (req, res) => {
  try {
    const insight = await Insight.findOne({
      _id: req.params.id,
      published: true,
    }).lean();

    if (!insight) {
      return res.status(404).json({
        success: false,
        message: "Insight not found",
      });
    }

    res.json({
      success: true,
      data: insight,
    });
  } catch (error) {
    console.error("Get insight error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* -------------------------------- */
/* CREATE INSIGHT                   */
/* -------------------------------- */

router.post("/", authenticateToken, requireEditor, async (req, res) => {
  try {
    const insightData = {
      ...req.body,
      readTime: calculateReadTime(req.body.content || ""),
    };

    const insight = new Insight(insightData);
    await insight.save();

    res.status(201).json({
      success: true,
      data: insight,
    });
  } catch (error) {
    console.error("Create insight error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating insight",
    });
  }
});

/* -------------------------------- */
/* UPDATE INSIGHT                   */
/* -------------------------------- */

router.put("/:id", authenticateToken, requireEditor, async (req, res) => {
  try {
    const insight = await Insight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      data: insight,
    });
  } catch (error) {
    console.error("Update insight error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

/* -------------------------------- */
/* DELETE INSIGHT                   */
/* -------------------------------- */

router.delete("/:id", authenticateToken, requireEditor, async (req, res) => {
  try {
    await Insight.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Insight deleted",
    });
  } catch (error) {
    console.error("Delete insight error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

module.exports = router;
