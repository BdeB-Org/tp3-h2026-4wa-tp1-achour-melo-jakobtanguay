//connexion à la base de données
const db = require('../config/database');

//Partie Isabelle
// GET
exports.getCritique = (req,res)=>{
 db.all('SELECT * FROM critiques',(err,rows)=>{
  res.json(rows);
 });
};

// GET single critique by id
exports.getCritiqueById = (req, res) => {
    const id = req.params.critique_id;
    db.get('SELECT * FROM critiques WHERE critique_id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (!row) return res.status(404).json({ message: 'Aucune critique trouvée avec cet ID' });
        res.json(row);
    });
};

exports.addCritique = (req,res)=>{

    const utilisateur_id = req.body.utilisateur_id;
    const jeu_id = req.body.jeu_id;
    const message = req.body.message;
    const note = req.body.note;
    const date = req.body.date || new Date().toISOString();
    console.log("Insertion:",utilisateur_id,jeu_id,message,note);
    if (!utilisateur_id || !jeu_id || note === undefined || note === null) {
        return res.status(400).json({ message: "Une ou des valeurs sont manquantes" });
    }
    if (note < 0) {
        return res.status(400).json({ message: "La note ne peut pas être inférieur à 0" });
    }
    db.run("INSERT INTO critiques(utilisateur_id, jeu_id, message, note, date) VALUES (?,?,?,?,?)",
        [utilisateur_id,jeu_id,message,note,date],
        function(err)
        {if(err){
            console.log(err);return res.status(500).json({erreur:err.message});
        }
        res.json({message:"Critique ajoutée",id:this.lastID});
    });
};

exports.updateCritique = (req, res) => {
    const id = req.params.critique_id;
    const { utilisateur_id, jeu_id, message, note } = req.body;
    db.run('UPDATE critiques SET utilisateur_id = ?, jeu_id = ?, message = ?, note = ? WHERE critique_id = ?', [utilisateur_id, jeu_id, message, note, id],
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