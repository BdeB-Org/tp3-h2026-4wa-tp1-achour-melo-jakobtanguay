const express = require('express');

const app = express();
app.use(express.json());

const jeuxvideoRoutes = require("./routes/jeuxvideoRoutes");

const critiquesRoutes = require("./routes/critiquesRoutes");

app.use(express.json());


app.use("/", jeuxvideoRoutes);
app.use("/", critiquesRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});