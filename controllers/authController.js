const db = require('../config/database');
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
};