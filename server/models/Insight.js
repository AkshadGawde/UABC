const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Technology",
          "Business",
          "Innovation",
          "Industry",
          "Research",
          "Analysis",
        ],
        message:
          "Category must be one of: Technology, Business, Innovation, Industry, Research, Analysis",
      },
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
    readTime: {
      type: Number,
      required: true,
      min: [1, "Read time must be at least 1 minute"],
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: false, // Prevent automatic index creation
    },
    seoTitle: {
      type: String,
      maxlength: [60, "SEO title cannot exceed 60 characters"],
    },
    seoDescription: {
      type: String,
      maxlength: [160, "SEO description cannot exceed 160 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted date
insightSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Pre-save middleware to generate slug
insightSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  }

  // Set publishedAt when published status changes to true
  if (this.isModified("published") && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Index for better query performance
insightSchema.index({ published: 1, createdAt: -1 });
insightSchema.index({ category: 1, published: 1 });
insightSchema.index({ tags: 1 });
// Slug index handled by unique: true above

// Static methods
insightSchema.statics.findPublished = function () {
  return this.find({ published: true }).sort({ publishedAt: -1 });
};

insightSchema.statics.findByCategory = function (category) {
  return this.find({ category, published: true }).sort({ publishedAt: -1 });
};

// Instance methods
insightSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

insightSchema.methods.toggleLike = function () {
  this.likes += 1;
  return this.save();
};

module.exports = mongoose.model("Insight", insightSchema);
