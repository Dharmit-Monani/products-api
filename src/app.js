const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");       // NEW
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost"],  // ← http://localhost add karo
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());           // Parse httpOnly cookies — NEW
app.use(morgan("dev"));

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);          // NEW — auth routes
app.use("/api/products", productRoutes);   // existing — unchanged

// Home route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Products API is running!" });
});

// ─── Error Handler ───────────────────────────────────────────
app.use(errorHandler);

// ─── MongoDB Connect & Server Start ──────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });