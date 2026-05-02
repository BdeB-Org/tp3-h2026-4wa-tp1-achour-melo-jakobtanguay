//connexion à la base de données
const db = require('../config/database');

//Partie Axel
// GET
exports.getCritique = (req,res)=>{
 db.all('SELECT * FROM critiques',(err,rows)=>{
  res.json(rows);
 });
};

exports.addCritique = (req,res)=>{
    const critique_id = req.body.critique_id;
    const date = req.body.date;
    const utilisateur_id = req.body.utilisateur_id;
    const jeu_id = req.body.jeu_id;
    const message = req.body.message;
    const note = req.body.note;
    console.log("Insertion:",critique_id,date,utilisateur_id,jeu_id,message,note);
    if (!critique_id || !date || !utilisateur_id || !jeu_id || !note) {
        return res.status(400).json({ message: "Une ou des valeurs sont manquantes" });
    }
    if (note < 0) {
        return res.status(400).json({ message: "La note ne peut pas être inférieur à 0" });
    }
    db.run("INSERT INTO critiques(critique_id, date, utilisateur_id, jeu_id, message, note) VALUES (?,?,?,?,?,?)",
        [critique_id,date,utilisateur_id,jeu_id,message,note],
        function(err)
        {if(err){
            console.log(err);return res.status(500).json({erreur:err.message});
        }
        res.json({message:"Critique ajoutée",id:this.lastID});
    });
};

exports.updateCritique = (req, res) => {
    const id = req.params.critique_id;
    const { critique_id, date, utilisateur_id, jeu_id, message, note } = req.body;
    db.run('UPDATE critiques SET critique_id = ?, date = ?, utilisateur_id = ?, jeu_id = ?, message = ?, note = ? WHERE critique_id = ?', [critique_id, date, utilisateur_id, jeu_id, message, note, id],
        function(err) {
        if (err) {
                return res.status(500).json({ erreur: err.message });
            }
            res.json({ message: "Critique mis à jour", id: id });
        });
};

exports.deleteCritique = (req, res) => {
    const id = req.params.critique_id;
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run('DELETE FROM critiques WHERE critique_id = ?', [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erreur: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Aucune critique trouvée avec cet ID" });
        }
        res.json({ message: "Critique supprimée", id: id });
    });
};