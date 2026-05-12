// Ye middleware saari errors ko handle karta hai
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  // Mongoose Bad ObjectId Error
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid product ID format" });
  }

  // Default Error
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

module.exports = errorHandler;
