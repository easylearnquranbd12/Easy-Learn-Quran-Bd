const { getLayerManagementFieldsCollection } = require("../config/db");

const layerManagementFields = getLayerManagementFieldsCollection();

// Update Layer Field
const updateLayerManagementFields = async (req, res) => {
  try {
    const { layerName, fieldName, value } = req.body;

    if (!layerName) {
      return res.status(400).json({
        success: false,
        message: "layerName is required",
      });
    }

    if (!fieldName) {
      return res.status(400).json({
        success: false,
        message: "fieldName is required",
      });
    }

    const doc = await layerManagementFields.findOne({ layerName });
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "No document found" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: "value is required for this field",
        });
      }
      updateData[fieldName] = value;
    }

    const result = await layerManagementFields.updateOne(
      { layerName },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No document found to update" });
    }

    res.json({
      success: true,
      message:
        fieldName === "isActive"
          ? `isActive toggled successfully`
          : `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Layers
const getLayerManagementFields = async (req, res) => {
  try {
    const result = await layerManagementFields.find().toArray();
    console.log("Layer data found:", result);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  updateLayerManagementFields,
  getLayerManagementFields,
};
