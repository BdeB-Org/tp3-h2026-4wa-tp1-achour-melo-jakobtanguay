const express = require("express");
const router = express.Router();

const utilisateursController = require("../controllers/utilisateursController.js");

// Set up du CRUD
router.get("/utilisateurs", utilisateursController.getUtilisateur);

router.post("/utilisateurs", utilisateursController.addUtilisateur);

router.put("/utilisateurs/:utilisateur_id", utilisateursController.updateUtilisateur);

router.delete("/utilisateurs/:utilisateur_id", utilisateursController.deleteUtilisateur);

module.exports = router;
