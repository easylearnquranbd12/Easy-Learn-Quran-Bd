const express = require('express');
const { getSocialLinks, updateSocialLinks } = require('../controllers/socialLinksController');
const router = express.Router();


// GET social links
router.get('/', getSocialLinks);
router.put('/', updateSocialLinks);

module.exports = router;