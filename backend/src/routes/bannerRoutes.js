const express = require("express");
const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner, getAllStoriesVideo, createStoriesVideo, deleteStoriesVideo } = require("../controllers/bannerController");
// const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require("../controllers/bannerController");


const router = express.Router();

router.post("/", createBanner);
router.get("/", getAllBanners);
// router.get("/:id", getBannerById);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

// Stories
router.get("/stories",getAllStoriesVideo)
router.post("/stories",createStoriesVideo)
router.delete("/stories/:id",deleteStoriesVideo)

module.exports = router;
