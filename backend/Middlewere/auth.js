const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.headers['token'];

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }
};

