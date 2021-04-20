const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Utilisateur non autorisé";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Utilisateur non autorisé.")
        });
    }
};