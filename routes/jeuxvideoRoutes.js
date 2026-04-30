const express = require("express");
const router = express.Router();

const jeuxvideoController = require("../controllers/jeuxvideoController");

router.get("/jeuxvideo", jeuxvideoController.getJeux_video);

router.post("/jeuxvideo", jeuxvideoController.addJeux_video);

router.put("/jeuxvideo/:id", jeuxvideoController.updateJeux_video);

router.delete("/jeuxvideo/:id", jeuxvideoController.deleteJeux_video);

module.exports = router;
