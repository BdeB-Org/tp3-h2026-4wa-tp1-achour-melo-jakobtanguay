const express = require("express");
const router = express.Router();

const utilisateursController = require("../controllers/utilisateursController.js");

const verifyToken = require('../middleware/authMiddleware');


// Set up du CRUD
router.get("/utilisateurs", verifyToken, utilisateursController.getUtilisateur);

router.post("/utilisateurs", verifyToken,utilisateursController.addUtilisateur);

router.put("/utilisateurs/:utilisateur_id", verifyToken, utilisateursController.updateUtilisateur);

router.delete("/utilisateurs/:utilisateur_id", verifyToken, utilisateursController.deleteUtilisateur);

module.exports = router;
