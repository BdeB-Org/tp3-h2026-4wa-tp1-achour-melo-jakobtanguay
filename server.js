const express = require('express');
const cors = require("cors");

require('./config/database');

const authRoutes = require('./routes/authRoutes');
const utilisateursRoutes = require('./routes/utilisateursRoutes');
const jeuxvideoRoutes = require("./routes/jeuxvideoRoutes");
const critiquesRoutes = require("./routes/critiquesRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/", jeuxvideoRoutes);
app.use("/", critiquesRoutes);
app.use('/auth', authRoutes);
app.use('/utilisateurs', utilisateursRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});