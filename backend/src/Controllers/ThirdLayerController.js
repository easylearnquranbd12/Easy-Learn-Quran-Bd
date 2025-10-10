const { ObjectId } = require("mongodb");
const {
  getFirstLayerElegantFieldsCollection,
  getFirstLayerElegantExerciseCollection,
} = require("../config/db");

// elegant
const elegantFieldsCollection = getFirstLayerElegantFieldsCollection();
const elegantExerciseCollection = getFirstLayerElegantExerciseCollection();

// ✅ Update Elegant Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateElegantField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    if (!fieldName) {
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      // যদি isActive update হয়, toggle কর
      const doc = await elegantFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No elegant found" });
      }

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

    const result = await elegantFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No elegant found to update" });
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
// ✅ Get Elegant Fields
const getElegantField = async (req, res) => {
  try {
    const result = await elegantFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseElegant = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await elegantExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await elegantExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 10 * 24 * 60 * 60 } // 30 days
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created. It will auto-delete after 30 days.",
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createVocabulary,
  getAllVocabulary,
  deleteVocabulary,
  updateVocabularyField,
  getVocabularyField,
  createExercise,
  createElegant,
  getAllElegant,
  deleteElegant,
  updateElegantField,
  getElegantField,
  createExerciseElegant,
};
