
const express = require("express");
const { deleteVideo, deleteImage } = require("../Controllers/mediaUploadController");
const router = express.Router();

router.post("/video", deleteVideo);
router.post("/image", deleteImage);

module.exports = router;
