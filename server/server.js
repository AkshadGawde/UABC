const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const insightsRoutes = require("./routes/insights");
const pdfInsightRoutes = require("./routes/pdfInsights");

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://uabc.co.in",
  "https://www.uabc.co.in",
  "https://uabc.vercel.app",
  "https://www.uabc.vercel.app",
  "https://uabc-cms.vercel.app",
];

console.log("✅ CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("✅ Request with no origin accepted");
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        console.log(`✅ CORS allowed for origin: ${origin}`);
        callback(null, true);
      } else if (process.env.NODE_ENV === "development") {
        console.log(`✅ Development mode - allowing origin: ${origin}`);
        callback(null, true);
      } else {
        console.log(`⚠️  CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

// Handle preflight requests explicitly
app.options("*", cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Debug environment variables
console.log("🔍 Environment check:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- PORT:", process.env.PORT);
console.log("- MongoDB URI exists:", !!process.env.MONGODB_URI);
console.log("- JWT Secret exists:", !!process.env.JWT_SECRET);

// MongoDB connection with improved error handling
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is not set");
  process.exit(1);
}

let dbConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
    });
    dbConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    dbConnected = false;
    console.error("❌ MongoDB connection error:", error.message);
    console.error("🔧 Troubleshooting:");
    console.error("   1. Check MONGODB_URI environment variable");
    console.error("   2. Verify MongoDB Atlas network access (0.0.0.0/0)");
    console.error("   3. Check if database credentials are correct");
    console.error("   4. Ensure Render IP is whitelisted in MongoDB Atlas");
    
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Try to connect to MongoDB
connectDB();

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UABC CMS Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      insights: "/api/insights",
      "pdf-insights": "/api/pdf-insights",
    },
    timestamp: new Date().toISOString(),
  });
});

// Favicon handler
app.get("/favicon.ico", (req, res) => {
  res.status(204).send();
});

// Middleware for PDF routes - increase timeout for large file transfers
const pdfTimeout = (req, res, next) => {
  req.setTimeout(120000); // 120 second timeout for PDF operations
  res.setTimeout(120000); // 120 second timeout for PDF responses
  next();
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/pdf-insights", pdfTimeout, pdfInsightRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  const status = dbConnected ? 200 : 503;
  
  res.status(status).json({
    status: dbConnected ? "OK" : "DB_DISCONNECTED",
    message: dbConnected 
      ? "UABC CMS Backend is running with database connected" 
      : "UABC CMS Backend is running but database is disconnected. Check MongoDB Atlas settings.",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: {
      connected: dbConnected,
      readyState: mongoose.connection.readyState,
      name: mongoose.connection.name || "unknown",
      host: mongoose.connection.host || "unknown"
    },
    uptime: process.uptime()
  });
});

// Global error handler - MUST be last middleware
app.use((error, req, res, next) => {
  console.error("❌ Uncaught Error:", {
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
  });
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { 
      stack: error.stack,
      path: req.originalUrl 
    }),
  });
});

// 404 handler for unmatched routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 API Endpoints:`);
  console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
  console.log(`   - Insights: http://localhost:${PORT}/api/insights`);
  console.log(`   - PDF Insights: http://localhost:${PORT}/api/pdf-insights`);
}).setTimeout(120000); // 120 second timeout for large file transfers

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("⚠️  SIGTERM received, shutting down gracefully...");
  mongoose.connection.close();
  process.exit(0);
});
