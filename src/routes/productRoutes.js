const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

// ─── Public Routes — no login needed ─────────────────────────
router.get("/", getAllProducts);          // anyone can view all products
router.get("/:id", getProductById);      // anyone can view single product

// ─── Protected Routes — login required ───────────────────────
router.post("/", protect, createProduct);        // only logged in users
router.put("/:id", protect, updateProduct);      // only logged in users
router.delete("/:id", protect, deleteProduct);   // only logged in users

module.exports = router;