const express = require("express");
const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require("../controllers/bannerController");
// const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require("../controllers/bannerController");


const router = express.Router();

router.post("/", createBanner);
router.get("/", getAllBanners);
// router.get("/:id", getBannerById);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;
