const mongoose = require("mongoose");
const Insight = require("../models/Insight");

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uabc";

const fixPdfFolderName = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Find all insights with PDFs that have the old folder name
    const insights = await Insight.find({
      pdfUrl: { $regex: "/insights-pdfs/" },
    });

    console.log(
      `Found ${insights.length} insights with old folder name (insights-pdfs)`,
    );

    if (insights.length === 0) {
      console.log(
        "✅ No URLs to fix - all PDFs already use correct folder name",
      );
      await mongoose.connection.close();
      return;
    }

    // Fix each URL by replacing the folder name
    for (const insight of insights) {
      const originalUrl = insight.pdfUrl;
      const fixedUrl = originalUrl.replace("/insights-pdfs/", "/insights/");

      insight.pdfUrl = fixedUrl;
      await insight.save();

      console.log(`✅ Fixed insight: ${insight.title}`);
      console.log(`   From: ${originalUrl}`);
      console.log(`   To:   ${fixedUrl}`);
    }

    console.log(`\n✅ Successfully fixed ${insights.length} PDF URLs`);
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error fixing PDF URLs:", error);
    process.exit(1);
  }
};

fixPdfFolderName();
