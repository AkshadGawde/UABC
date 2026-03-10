const mongoose = require("mongoose");
const Insight = require("../models/Insight");

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uabc";

const cleanPdfUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // First, get total count of insights
    const totalInsights = await Insight.countDocuments();
    console.log(`Total insights in database: ${totalInsights}`);

    // Find all insights with pdfUrl
    const insights = await Insight.find({
      pdfUrl: { $exists: true, $ne: null },
    });

    console.log(`Found ${insights.length} insights with PDF URLs`);

    if (insights.length === 0) {
      console.log("\n📋 All insights in database:");
      const allInsights = await Insight.find().select("title pdfUrl");
      allInsights.forEach((i) => {
        console.log(
          `  - ${i.title}: ${i.pdfUrl ? i.pdfUrl.substring(0, 80) + "..." : "NO PDF URL"}`,
        );
      });
      console.log("\n✅ No PDFs to clean (or database is empty)");
      await mongoose.connection.close();
      return;
    }

    let updated = 0;

    for (const insight of insights) {
      const originalUrl = insight.pdfUrl;
      let cleanUrl = originalUrl;

      // Remove any fl_attachment parameters from the URL
      cleanUrl = cleanUrl.replace(/fl_attachment[^/]*/g, "");

      // Clean up any double slashes that might have been created
      cleanUrl = cleanUrl.replace(/\/\//g, "/");
      cleanUrl = cleanUrl.replace(/upload\/\//g, "upload/");
      cleanUrl = cleanUrl.replace(/upload\/\//g, "upload/");

      if (cleanUrl !== originalUrl) {
        insight.pdfUrl = cleanUrl;
        await insight.save();
        updated++;

        console.log(`✅ Fixed URL for: ${insight.title}`);
        console.log(`   From: ${originalUrl}`);
        console.log(`   To:   ${cleanUrl}`);
      } else {
        console.log(`✓ URL already clean for: ${insight.title}`);
      }
    }

    console.log(`\n✅ Cleaned ${updated} PDF URLs`);
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error cleaning PDF URLs:", error);
    process.exit(1);
  }
};

cleanPdfUrls();
