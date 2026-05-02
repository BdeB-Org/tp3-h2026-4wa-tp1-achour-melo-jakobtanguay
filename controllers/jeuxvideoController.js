const db = require('../config/database');

//requête GET
exports.getJeux_video = (req,res)=>{
 db.all('SELECT * FROM Jeux_videos',(err,rows)=>{
  res.json(rows);
 });
};

//requête POST
exports.addJeux_video = (req,res)=>{
    const jeu_id = req.body.jeu_id;
    const titre = req.body.titre;
    console.log("Insertion:",jeu_id, titre);
    db.run("INSERT INTO Jeux_videos(jeu_id,titre) VALUES (?,?)",[jeu_id,titre],
        function(err){if(err){
            console.log(err);
            return res.status(500).json({erreur:err.message});
        }res.json({message:"Jeu ajouté",id:this.lastID});});
    };

    //requête PUT
    exports.updateJeux_video = (req, res) => {
    const id = req.params.id;
    const { jeu_id, titre} = req.body;
    db.run('UPDATE Jeux_videos SET jeu_id=?, titre=? WHERE jeu_id=?',[jeu_id, titre, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({message: "Jeu vidéo modifié",id: id});
        });
    };

    //Requête DELETE
exports.deleteJeux_video = (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run('DELETE FROM Jeux_videos WHERE jeu_id = ?',[id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });}
                if (this.changes === 0) {
                    return res.status(404).json({ message: "Aucun jeu vidéo trouvé avec cet ID" });
                }
                res.json({ message: "Jeu vidéo supprimé", id: id });
            });
        };