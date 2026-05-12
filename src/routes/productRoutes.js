const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// /api/products
router.route("/")
  .get(getAllProducts)    // GET  → sab products
  .post(createProduct);  // POST → naya product

// /api/products/:id
router.route("/:id")
  .get(getProductById)    // GET    → ek product
  .put(updateProduct)     // PUT    → update
  .delete(deleteProduct); // DELETE → delete

module.exports = router;
