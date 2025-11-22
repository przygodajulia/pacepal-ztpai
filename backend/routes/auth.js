const jwt = require("jsonwebtoken");

// Funkcja generująca token JWT
function signToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

// Middleware sprawdzający poprawność tokena
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // oczekujemy formatu "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // console.log("JWT verify error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = { signToken, requireAuth };