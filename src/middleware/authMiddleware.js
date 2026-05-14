const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // Read token from httpOnly cookie
    const token = req.cookies?.token;

    // Reject if no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    // Verify token — throws error if invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded token ID
    const user = await User.findById(decoded.id);

    // Reject if user no longer exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // Attach user to request — available in all protected routes
    req.user = user;

    next();
  } catch (err) {
    // Handle expired token
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }

    // Handle invalid token
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }

    // Any other error
    return res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
  }
};

module.exports = { protect };
