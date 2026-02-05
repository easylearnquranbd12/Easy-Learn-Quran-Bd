const { ObjectId } = require("mongodb");
const {
  getSecondLayerSentenceFieldsCollection,
  getSecondLayerSentenceCollection,
  getSecondLayerSentenceExerciseCollection,
  getSecondLayerVerbFieldsCollection,
  getSecondLayerVerbCollection,
  getSecondLayerVerbExerciseCollection,
  getSecondLayerArticleFieldsCollection,
  getSecondLayerArticleCollection,
  getSecondLayerArticleExerciseCollection,
  getSecondLayerTenseFieldsCollection,
  getSecondLayerTenseCollection,
  getSecondLayerTenseExerciseCollection,
  getSecondLayerPrepositionFieldsCollection,
  getSecondLayerPrepositionCollection,
  getSecondLayerPrepositionExerciseCollection,
} = require("../config/db");

// sentence
const sentenceFieldsCollection = getSecondLayerSentenceFieldsCollection();
const sentenceCollection = getSecondLayerSentenceCollection();
const sentenceExerciseCollection = getSecondLayerSentenceExerciseCollection();
// Verb
const verbFieldsCollection = getSecondLayerVerbFieldsCollection();
const verbCollection = getSecondLayerVerbCollection();
const verbExerciseCollection = getSecondLayerVerbExerciseCollection();
// Article
const articleFieldsCollection = getSecondLayerArticleFieldsCollection();
const articleCollection = getSecondLayerArticleCollection();
const articleExerciseCollection = getSecondLayerArticleExerciseCollection();
// Tense
const tenseFieldsCollection = getSecondLayerTenseFieldsCollection();
const tenseCollection = getSecondLayerTenseCollection();
const tenseExerciseCollection = getSecondLayerTenseExerciseCollection();
// Perposition
const prepositionFieldsCollection = getSecondLayerPrepositionFieldsCollection();
const prepositionCollection = getSecondLayerPrepositionCollection();
const prepositionExerciseCollection =
  getSecondLayerPrepositionExerciseCollection();

// Sentence
// ✅ Create Sentence
const createSentence = async (req, res) => {
  try {
    const data = req.body;
    const result = await sentenceCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Sentence
const getAllSentence = async (req, res) => {
  try {
    const result = await sentenceCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Sentence
const deleteSentence = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sentenceCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Sentence not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Sentence Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateSentenceField = async (req, res) => {
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
      const doc = await sentenceFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No vocabulary found" });
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

    const result = await sentenceFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

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
const updateSentence = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await sentenceCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Sentence not found",
      });
    }

    res.json({
      success: true,
      message: "Sentence updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Sentence Fields
const getSentenceField = async (req, res) => {
  try {
    const result = await sentenceFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleSentence = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sentenceCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Sentence not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const createExerciseSentence = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await sentenceExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await sentenceExerciseCollection.createIndex(
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

// Verb
// ✅ Create Verb
const createVerb = async (req, res) => {
  try {
    const data = req.body;
    const result = await verbCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Verb
const getAllVerb = async (req, res) => {
  try {
    const result = await verbCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Verb
const deleteVerb = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await verbCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Sentence not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Verb Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateVerbField = async (req, res) => {
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
      const doc = await verbFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No vocabulary found" });
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

    const result = await verbFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

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
// ✅ Get Verb Fields
const getVerbField = async (req, res) => {
  try {
    const result = await verbFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const createExerciseVerb = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await verbExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await verbExerciseCollection.createIndex(
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

// Article
// ✅ Create Article
const createArticle = async (req, res) => {
  try {
    const data = req.body;
    const result = await articleCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Article
const getAllArticle = async (req, res) => {
  try {
    const result = await articleCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await articleCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Article Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateArticleField = async (req, res) => {
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
      const doc = await articleFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No Article found" });
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

    const result = await articleFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Article found to update" });
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
// ✅ Get Article Fields
const getArticleField = async (req, res) => {
  try {
    const result = await articleFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const createExerciseArticle = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await articleExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await articleExerciseCollection.createIndex(
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

// Tense
// ✅ Create Tense
const createTense = async (req, res) => {
  try {
    const data = req.body;
    const result = await tenseCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tense
const getAllTense = async (req, res) => {
  try {
    const result = await tenseCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tense
const deleteTense = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tenseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Tense not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Tense Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateTenseField = async (req, res) => {
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
      const doc = await tenseFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No Tense found" });
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

    const result = await tenseFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Tense found to update" });
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
// ✅ Get Tense Fields
const getTenseField = async (req, res) => {
  try {
    const result = await tenseFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const createExerciseTense = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await tenseExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await tenseExerciseCollection.createIndex(
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
// Preposition
// ✅ Create Preposition
const createPreposition = async (req, res) => {
  try {
    const data = req.body;
    const result = await prepositionCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Preposition
const getAllPreposition = async (req, res) => {
  try {
    const result = await prepositionCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Preposition
const deletePreposition = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prepositionCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Preposition not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Preposition Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updatePrepositionField = async (req, res) => {
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
      const doc = await prepositionFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No Preposition found" });
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

    const result = await prepositionFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Tense found to update" });
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
// ✅ Get Preposition Fields
const getPrepositionField = async (req, res) => {
  try {
    const result = await prepositionFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const createExercisePreposition = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await prepositionExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await prepositionExerciseCollection.createIndex(
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
  createSentence,
  getAllSentence,
  deleteSentence,
  updateSentenceField,
  getSentenceField,
  createExerciseSentence,
  createVerb,
  getAllVerb,
  deleteVerb,
  updateVerbField,
  getVerbField,
  createExerciseVerb,
  createArticle,
  getAllArticle,
  deleteArticle,
  updateArticleField,
  getArticleField,
  createExerciseArticle,
  createTense,
  getAllTense,
  deleteTense,
  updateTenseField,
  getTenseField,
  createExerciseTense,
  createPreposition,
  getAllPreposition,
  deletePreposition,
  updatePrepositionField,
  getPrepositionField,
  createExercisePreposition,
  updateSentence,
  getSingleSentence,
};
