const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET || process.env.JWT_SECRET // Secret Key Safeguard
    );

    // 💥 THE FIX: Extracting ID properly regardless of JWT payload shape
    const userId = decoded.id || decoded._id || decoded.userId;

    // Normalizing payload so every controller gets what it expects
    req.user = {
      ...decoded,
      id: userId,
      _id: userId
    };
    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;