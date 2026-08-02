const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    console.error("Full error:", error);
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = { requireAuth };
