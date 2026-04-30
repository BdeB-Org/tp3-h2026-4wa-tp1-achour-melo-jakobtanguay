const express = require('express');

const app = express();
app.use(express.json());

const jeuxvideoRoutes = require("./routes/jeuxvideoRoutes");

app.use("/", jeuxvideoRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});