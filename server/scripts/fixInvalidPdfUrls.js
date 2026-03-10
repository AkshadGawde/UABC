const mongoose = require("mongoose");
const Insight = require("../models/Insight");

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uabc";

const fixInvalidPdfUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Find all insights with pdfUrl containing invalid fl_attachment parameter
    const insights = await Insight.find({
      pdfUrl: { $regex: "fl_attachment" },
    });

    console.log(
      `Found ${insights.length} insights with invalid fl_attachment parameter`,
    );

    if (insights.length === 0) {
      console.log("✅ No invalid URLs to fix");
      await mongoose.connection.close();
      return;
    }

    let fixed = 0;

    for (const insight of insights) {
      const originalUrl = insight.pdfUrl;

      // Remove the invalid fl_attachment:false parameter
      // It appears in the URL like: /upload/fl_attachment:false/v1234/...
      let cleanUrl = originalUrl.replace(/fl_attachment:false\//g, "");

      // Also handle case where it appears as /upload//
      cleanUrl = cleanUrl.replace(/\/\/(?=v\d)/g, "/");

      console.log(`\n📝 Processing: ${insight.title}`);
      console.log(`   Original: ${originalUrl}`);
      console.log(`   Cleaned:  ${cleanUrl}`);

      insight.pdfUrl = cleanUrl;
      await insight.save();
      fixed++;

      console.log(`   ✅ Updated`);
    }

    console.log(`\n✅ Fixed ${fixed} PDF URLs`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing PDF URLs:", error);
    process.exit(1);
  }
};

fixInvalidPdfUrls();
