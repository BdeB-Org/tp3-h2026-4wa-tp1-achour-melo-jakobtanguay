const express = require("express");
const router = express.Router();

const critiquesController = require("../controllers/critiquesController.js");

// Set up du CRUD
router.get("/critiques", critiquesController.getCritique);

router.post("/critiques", critiquesController.addCritique);

router.put("/critiques/:critique_id", critiquesController.updateCritique);

router.delete("/critiques/:critique_id", critiquesController.deleteCritique);

module.exports = router;