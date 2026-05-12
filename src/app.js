const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());          // JSON body parse karta hai
app.use(morgan("dev"));           // Har request ko terminal mein log karta hai

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/products", productRoutes);

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
