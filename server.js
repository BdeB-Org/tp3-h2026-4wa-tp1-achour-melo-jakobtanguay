const express = require('express');
const path = require('path');
const app = express();

// Initialise la BD
require('./config/database');

app.use(express.json());
app.use(express.static('public'));

const jeuxvideoRoutes = require('./routes/jeuxvideoRoutes');
const critiquesRoutes = require('./routes/critiquesRoutes');
const utilisateursRoutes = require('./routes/utilisateursRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', critiquesRoutes);
app.use('/api', jeuxvideoRoutes);
app.use('/api', utilisateursRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});