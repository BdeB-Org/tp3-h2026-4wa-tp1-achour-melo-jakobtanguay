/*const db = require('../config/database');
const jwt = require('jsonwebtoken');
exports.login = (req, res) => {
    const { nom, motDePasse } = req.body;
    if (!nom || !motDePasse) {
        return res.status(400).json({
    message: "Nom et mot de passe requis"}); }
db.get(
    "SELECT * FROM Utilisateurs WHERE nom = ? AND motDePasse = ?",
    [nom, motDePasse], (err, row) => {
        if(nom==="admin" && motDePasse==="1234"){
        res.json({message:"Connexion réussie"});
        return;}
        if (err) { 
        return res.status(500).json({ message: "Erreur serveur" });}
    if (!row) { 
        return res.status(401).json({ message: "Identifiants invalides" }); }
    const token = jwt.sign(
        { id: row.id, nom: row.nom },
        "secretkey",
        { expiresIn: "1h" }
);
    res.json({
                message: "Authentification réussie",
                token: token
            });     
        }
    );
};*/

const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!user) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                'secretkey',
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Connexion réussie',
                token,
                username: user.username
            });
        }
    );
};
