const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ─── Helper — Generate JWT & set httpOnly cookie ─────────────
const sendTokenCookie = (user, statusCode, res) => {
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,  // JS cannot access this cookie (XSS protection)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  // Send response with cookie
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};

// ─── POST /api/auth/register ──────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create user — password hashing happens in User model pre-save hook
    const user = await User.create({ name, email, password });

    // Send token as httpOnly cookie
    sendTokenCookie(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user — include password field (it's hidden by default)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Send token as httpOnly cookie
    sendTokenCookie(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/logout ────────────────────────────────────
const logout = async (req, res) => {
  // Clear the cookie by setting it to expire immediately
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};

// ─── GET /api/auth/me ─────────────────────────────────────────
// Returns currently logged in user info
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { register, login, logout, getMe };
