/*Page fait par tous les membres de l'équipe*/
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./fichier.db', (err) => {
    if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {

        db.run(`
        CREATE TABLE IF NOT EXISTS Critiques (
            critique_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            utilisateur_id INTEGER,
            message TEXT,
            note TEXT,
            jeu_id INTEGER
        )
    `);

     db.run(`
        CREATE TABLE IF NOT EXISTS Jeux_videos (
            jeu_id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT
        )
    `);

    //   db.run(`
    //     CREATE TABLE IF NOT EXISTS Publications (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nom TEXT,
    //         programme TEXT
    //     )
    // `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Utilisateurs (
            utilisateur_id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT UNIQUE,
            prenom TEXT,
            motDePasse TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO Utilisateurs (nom, prenom, motDePasse) VALUES (?, ?, ?)",
        ['admin', '', 'admin123']
    );
});

module.exports = db;
