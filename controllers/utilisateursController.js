
//connexion à la base de données
const db = require('../config/database');

//Partie Isabelle
// GET
exports.getUtilisateur = (req,res)=>{
 db.all('SELECT * FROM utilisateurs',(err,rows)=>{
  res.json(rows);
 });
};

exports.addUtilisateur = (req,res)=>{
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const utilisateur_id = req.body.utilisateur_id;
    console.log("Insertion:",nom,prenom,utilisateur_id);
    if (!nom || !prenom || !utilisateur_id) {
        return res.status(400).json({ message: "Une ou des valeurs sont manquantes" });
    }
    db.run("INSERT INTO utilisateurs(nom, prenom,utilisateur_id) VALUES (?,?,?)",
        [nom,prenom,utilisateur_id],
        function(err){if(err){console.log(err);return res.status(500).json({erreur:err.message});}
        res.json({message:"Utilisateur ajouté",id:this.lastID});
    });};

exports.updateUtilisateur = (req, res) => {
    const id = req.params.utilisateur_id;
    const { nom, prenom, utilisateur_id } = req.body;
    db.run('UPDATE utilisateurs SET nom = ?, prenom = ?, utilisateur_id = ? WHERE utilisateur_id = ?', [nom, prenom, utilisateur_id, id],
        function(err) {
            if (err) {
                return res.status(500).json({ erreur: err.message });
            }
            res.json({ message: "Utilisateur mis à jour", id: id });
        });
};

exports.deleteUtilisateur = (req, res) => {
    const id = req.params.utilisateur_id;
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run('DELETE FROM utilisateurs WHERE utilisateur_id = ?', [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erreur: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
        }
        res.json({ message: "Utilisateur supprimé", id: id });
    });
};