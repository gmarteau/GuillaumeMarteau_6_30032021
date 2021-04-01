const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secret_key");
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