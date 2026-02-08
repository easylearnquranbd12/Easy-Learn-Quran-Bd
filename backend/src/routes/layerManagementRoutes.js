const express = require("express");
const { updateLayerManagementFields, getLayerManagementFields } = require("../controllers/layerManagementController");


const router = express.Router();

// Layer Management field
router.put("/field/:id", updateLayerManagementFields);
router.get("/field", getLayerManagementFields);



module.exports = router;
