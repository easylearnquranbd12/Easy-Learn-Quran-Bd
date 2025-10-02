const { ObjectId } = require("mongodb");
const {
  getFirstLayerSentenceCollection,
  getFirstLayerElegantCollection,
  getFirstLayerVocabularyCollection,
  getFirstLayerVocabularyCollections,
  getFirstLayerVocabularyExerciseCollections,
} = require("../config/db");

// ✅ This already returns the collection
const sentenceCollection = getFirstLayerSentenceCollection();
const elegantCollection = getFirstLayerElegantCollection();
const vocabularyCollection = getFirstLayerVocabularyCollection();
const vocabulary = getFirstLayerVocabularyCollections();
const exercise = getFirstLayerVocabularyExerciseCollections();

// Vocabulary
// ✅ Create Vocabulary
const createVocabulary = async (req, res) => {
  try {
    const data = req.body;
    const result = await vocabulary.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Vocabulary
const getAllVocabulary = async (req, res) => {
  try {
    const result = await vocabulary.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Vocabulary
const deleteVocabulary = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vocabulary.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vocabulary not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Vocabulary Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateVocabularyField = async (req, res) => {
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
      const doc = await vocabularyCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No vocabulary found" });
      }

      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value) {
        return res
          .status(400)
          .json({ success: false, message: "value is required for this field" });
      }
      updateData[fieldName] = value;
    }

    const result = await vocabularyCollection.updateOne({}, { $set: updateData });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No vocabulary found to update" });
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
// ✅ Get Vocabulary Fields
const getVocabularyField = async (req, res) => {
  try {
    const result = await vocabularyCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporari Excursise data 
// Exercise Controller
const createExercise = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await exercise.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await exercise.createIndex(
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


// Create new sentence(s)
const createSentence = async (req, res) => {
  try {
    const elegant = Array.isArray(req.body) ? req.body : [req.body]; // always array
    const result = await sentenceCollection.insertMany(sentences);

    res.status(201).json({
      message: "Sentences added successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sentences", error: error.message });
  }
};

// Get all sentences
const getSentences = async (req, res) => {
  try {
    const sentences = await sentenceCollection
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.json(sentences);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sentences", error: error.message });
  }
};

// Delete sentence
const deleteSentence = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sentenceCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Sentence not found" });
    }

    res.json({ message: "Sentence deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting sentence", error: error.message });
  }
};

// Create new Elegant(s)
const createElegant = async (req, res) => {
  try {
    const elegant = Array.isArray(req.body) ? req.body : [req.body]; // always array
    const result = await elegantCollection.insertMany(elegant);

    res.status(201).json({
      message: "elegant added successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding elegant", error: error.message });
  }
};

// Get all elegant
const getElegant = async (req, res) => {
  try {
    const elegant = await elegantCollection.find().sort({ _id: -1 }).toArray();
    res.json(elegant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching elegant", error: error.message });
  }
};

// Delete elegant
const deleteElegant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await elegantCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "elegant not found" });
    }

    res.json({ message: "elegant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting elegant", error: error.message });
  }
};

module.exports = {
  createVocabulary,
  getAllVocabulary,
  deleteVocabulary,
  updateVocabularyField,
  getVocabularyField,
  createExercise,
  createSentence,
  getSentences,
  deleteSentence,
  createElegant,
  getElegant,
  deleteElegant,
};
