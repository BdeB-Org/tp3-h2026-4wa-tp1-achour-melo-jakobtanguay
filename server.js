const express = require('express');
const path = require('path');
const app = express();

// Initialise la BD
require('./config/database');

app.use(express.json());
app.use(express.static('public'));

const jeuxvideosRoutes = require('./routes/jeuxvideosRoutes');
const critiquesRoutes = require('./routes/CritiquesRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/critiques', critiquesRoutes);
app.use('/api/jeuxvideos', jeuxvideosRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});