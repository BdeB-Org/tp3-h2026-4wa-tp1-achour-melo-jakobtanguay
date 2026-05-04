
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
    db.run(`
        CREATE TABLE IF NOT EXISTS Utilisateurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);

        db.run(`
        CREATE TABLE IF NOT EXISTS Critiques (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);

     db.run(`
        CREATE TABLE IF NOT EXISTS Jeux_videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
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
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
        ['admin', 'admin123']
    );
});

module.exports = db;
