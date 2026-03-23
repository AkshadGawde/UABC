const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const mongoose = require("mongoose");
const Insight = require("../models/Insight");

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/uabc";

const normalizePdfPublicId = (publicId) => {
  if (!publicId) return "";
  return publicId.replace(/\.pdf$/i, "").trim();
};

const extractVersionFromPdfUrl = (url) => {
  if (!url) return undefined;
  const match = url.match(/\/v(\d+)\//);
  return match ? match[1] : undefined;
};

const extractPublicIdFromPdfUrl = (url) => {
  if (!url) return "";

  const sanitizedUrl = url.split("?")[0];
  const match = sanitizedUrl.match(
    /\/upload\/(?:fl_attachment:false\/)?(?:v\d+\/)?(.+?)(?:\.pdf)?$/i,
  );

  return normalizePdfPublicId(match ? match[1] : "");
};

const buildInlinePdfUrl = (publicId, version) => {
  if (!publicId) return "";
  const normalizedPublicId = normalizePdfPublicId(publicId);
  const versionPart = version ? `/v${version}` : "";
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload${versionPart}/${normalizedPublicId}.pdf`;
};

const fixPdfPublicIds = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    const insights = await Insight.find({
      pdfUrl: { $exists: true, $ne: null },
    });

    console.log(`Found ${insights.length} PDF insights to inspect`);

    let updated = 0;

    for (const insight of insights) {
      const derivedPublicId = normalizePdfPublicId(
        insight.pdfPublicId || extractPublicIdFromPdfUrl(insight.pdfUrl),
      );
      const derivedVersion = insight.pdfVersion || extractVersionFromPdfUrl(insight.pdfUrl);
      const normalizedUrl = buildInlinePdfUrl(derivedPublicId, derivedVersion);

      if (!derivedPublicId || !normalizedUrl) {
        console.log(`⚠️ Skipping ${insight.title} - unable to derive Cloudinary public ID`);
        continue;
      }

      const needsUpdate =
        insight.pdfPublicId !== derivedPublicId ||
        insight.pdfVersion !== derivedVersion ||
        insight.pdfUrl !== normalizedUrl;

      if (!needsUpdate) {
        continue;
      }

      insight.pdfPublicId = derivedPublicId;
      if (derivedVersion) {
        insight.pdfVersion = derivedVersion;
      }
      insight.pdfUrl = normalizedUrl;
      await insight.save();
      updated += 1;

      console.log(`✅ Updated ${insight.title}`);
      console.log(`   public_id: ${derivedPublicId}`);
      console.log(`   url: ${normalizedUrl}`);
    }

    console.log(`\n✅ Fixed ${updated} PDF insight records`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing PDF public IDs:", error);
    process.exit(1);
  }
};

fixPdfPublicIds();