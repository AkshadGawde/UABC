const mongoose = require("mongoose");
const Insight = require("../models/Insight");

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uabc";

const fixPdfUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Find all insights with duplicate fl_attachment flags
    const insights = await Insight.find({
      pdfUrl: { $regex: "fl_attachment:false/fl_attachment:false" }
    });

    console.log(`Found ${insights.length} insights with duplicate flags`);

    if (insights.length === 0) {
      console.log("✅ No URLs to fix");
      await mongoose.connection.close();
      return;
    }

    // Fix each URL by removing the duplicate flag
    for (const insight of insights) {
      const originalUrl = insight.pdfUrl;
      const fixedUrl = originalUrl.replace(
        "fl_attachment:false/fl_attachment:false/",
        "fl_attachment:false/"
      );

      insight.pdfUrl = fixedUrl;
      await insight.save();

      console.log(`Fixed: ${originalUrl}`);
      console.log(`  To: ${fixedUrl}`);
    }

    console.log(`✅ Fixed ${insights.length} PDF URLs`);
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error fixing PDF URLs:", error);
    process.exit(1);
  }
};

fixPdfUrls();
