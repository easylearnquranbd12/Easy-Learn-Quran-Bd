const express = require('express');
const { getSocialLinks, updateSocialLinks } = require('../Controllers/socialLinksController');
const router = express.Router();


// GET social links
router.get('/', getSocialLinks);
router.put('/', updateSocialLinks);

module.exports = router;