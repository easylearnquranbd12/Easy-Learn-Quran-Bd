const express = require("express");
const { updateLayerManagementFields, getLayerManagementFields } = require("../Controllers/layerManagementController");


const router = express.Router();

// Layer Management field
router.put("/field/:id", updateLayerManagementFields);
router.get("/field", getLayerManagementFields);



module.exports = router;
