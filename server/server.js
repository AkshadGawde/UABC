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

// MongoDB connection
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is not set");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    console.log("📊 Database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("🔧 Check your MongoDB URI and network connection");
    // Don't exit - show error in health checks instead
    console.error("⚠️  Server will start but database operations will fail");
  });

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/pdf-insights", pdfInsightRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "OK" : "WARNING",
    message: dbConnected 
      ? "UABC CMS Backend is running" 
      : "UABC CMS Backend is running but database is disconnected",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: {
      connected: dbConnected,
      name: mongoose.connection.name || "unknown"
    }
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
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
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("⚠️  SIGTERM received, shutting down gracefully...");
  mongoose.connection.close();
  process.exit(0);
});
