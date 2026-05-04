/*const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
        message: "Token manquant"
    })
;}
const token = header.split(" ")[1];
try { const decoded = jwt.verify(token, "secretkey");
req.user = decoded;
next();
} catch (err) { res.status(401).json({
message: "Token invalide"}); }}
module.exports = verifyToken;*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};
