
/*Page fait par Isabelle JT*/
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./fichier.db', (err) => {
    if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {
    /*db.run(`
        CREATE TABLE IF NOT EXISTS Utilisateurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);*/

        db.run(`
        CREATE TABLE IF NOT EXISTS Critiques (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            utilisateur_id TEXT,
            critique_id TEXT,
            message TEXT,
            note TEXT,
            jeu_id TEXT,
        )
    `);

     db.run(`
        CREATE TABLE IF NOT EXISTS Jeux_videos (
            jeu_id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT
        )
    `);

      db.run(`
        CREATE TABLE IF NOT EXISTS Publications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Utilisateurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT UNIQUE,
            motDePasse TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO Utilisateurs (nom, motDePasse) VALUES (?, ?)",
        ['admin', 'admin123']
    );
});

module.exports = db;
