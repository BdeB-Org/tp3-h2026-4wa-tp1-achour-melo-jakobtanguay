
const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, Utilisateurs) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (!Utilisateurs) {
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe invalide' });
            }

            const token = jwt.sign(
                { id: Utilisateurs.id, username: Utilisateurs.username },
                'secretkey',
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Connexion réussie',
                token,
                username: Utilisateurs.username
            });
        }
    );
};
