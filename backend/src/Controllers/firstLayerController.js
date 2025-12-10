const { ObjectId } = require("mongodb");
const {
  getFirstLayerVocabularyCollection,
  getFirstLayerVocabularyCollections,
  getFirstLayerVocabularyExerciseCollections,
  getFirstLayerElegantFieldsCollection,
  getFirstLayerElegantCollection,
  getFirstLayerElegantExerciseCollection,
  getFirstLayerTantusterFieldsCollection,
  getFirstLayerTantusterCollection,
  getFirstLayerTantusterExerciseCollection,
  getFirstLayerNewTantusterFieldsCollection,
  getFirstLayerNewTantusterCollection,
  getFirstLayerNewTantusterExerciseCollection,
  getFirstLayerIdiomCollection,
  getFirstLayerIdiomCollections,
  getFirstLayerIdiomExerciseCollections,
} = require("../config/db");

const vocabularyCollection = getFirstLayerVocabularyCollection();
const vocabulary = getFirstLayerVocabularyCollections();
const exercise = getFirstLayerVocabularyExerciseCollections();

// idiom
const idiomCollection = getFirstLayerIdiomCollection();
const idiom = getFirstLayerIdiomCollections();
const idiomExercise = getFirstLayerIdiomExerciseCollections();

// elegant
const elegantFieldsCollection = getFirstLayerElegantFieldsCollection();
const elegantCollection = getFirstLayerElegantCollection();
const elegantExerciseCollection = getFirstLayerElegantExerciseCollection();
// Tantuster
const tantusterFieldsCollection = getFirstLayerTantusterFieldsCollection();
const tantusterCollection = getFirstLayerTantusterCollection();
const tantusterExerciseCollection = getFirstLayerTantusterExerciseCollection();
// New Tantuster
const newTantusterFieldsCollection =
  getFirstLayerNewTantusterFieldsCollection();
const newTantusterCollection = getFirstLayerNewTantusterCollection();
const newTantusterExerciseCollection =
  getFirstLayerNewTantusterExerciseCollection();

// Idiom
// ✅ Create Idiom
const createIdiom = async (req, res) => {
  try {
    const data = req.body;
    const result = await idiom.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Idiom
const getAllIdiom = async (req, res) => {
  try {
    const result = await idiom.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Idiom
const deleteIdiom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await idiom.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Idiom not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Idiom Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateIdiomField = async (req, res) => {
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
      const doc = await idiomCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "No idiom found" });
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

    const result = await idiomCollection.updateOne({}, { $set: updateData });

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
// ✅ Get Idiom Fields
const getIdiomField = async (req, res) => {
  try {
    const result = await idiomCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Single Idiom by ID
const getSingleIdiom = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await idiom.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Idiom not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateIdiom = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await idiom.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Idiom not found",
      });
    }

    res.json({
      success: true,
      message: "Idiom updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Temporari Excursise data
// Exercise Controller
const createExerciseIdiom = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await idiomExercise.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await idiomExercise.createIndex(
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
        return res.status(400).json({
          success: false,
          message: "value is required for this field",
        });
      }
      updateData[fieldName] = value;
    }

    const result = await vocabularyCollection.updateOne(
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

// Elegant
// ✅ Create Elegant
const createElegant = async (req, res) => {
  try {
    const data = req.body;
    const result = await elegantCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Elegant
const getAllElegant = async (req, res) => {
  try {
    const result = await elegantCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Elegant
const deleteElegant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await elegantCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Elegant not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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

// Tantuster
// ✅ Create Tantuster
const createTantuster = async (req, res) => {
  try {
    const data = req.body;
    const result = await tantusterCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tantuster
const getAllTantuster = async (req, res) => {
  try {
    const result = await tantusterCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tantuster
const deleteTantuster = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tantusterCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Elegant not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Tantuster Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateTantusterField = async (req, res) => {
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
      const doc = await tantusterFieldsCollection.findOne({});
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

    const result = await tantusterFieldsCollection.updateOne(
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
const getTantusterField = async (req, res) => {
  try {
    const result = await tantusterFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseTantuster = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await tantusterExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await tantusterExerciseCollection.createIndex(
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

//New Tantuster
// ✅ New Create Tantuster
const createNewTantuster = async (req, res) => {
  try {
    const data = req.body;
    const result = await newTantusterCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tantuster
const getAllNewTantuster = async (req, res) => {
  try {
    const result = await newTantusterCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tantuster
const deleteNewTantuster = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await newTantusterCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Elegant not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Tantuster Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
const updateNewTantusterField = async (req, res) => {
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
      const doc = await newTantusterFieldsCollection.findOne({});
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

    const result = await newTantusterFieldsCollection.updateOne(
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
const getNewTantusterField = async (req, res) => {
  try {
    const result = await newTantusterFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseNewTantuster = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(), // Save timestamp
    };

    // Insert exercise
    const result = await newTantusterExerciseCollection.insertOne(data);

    // Create TTL index (will auto delete after 30 days)
    await newTantusterExerciseCollection.createIndex(
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
  createTantuster,
  getAllTantuster,
  deleteTantuster,
  updateTantusterField,
  getTantusterField,
  createExerciseTantuster,
  createNewTantuster,
  getAllNewTantuster,
  deleteNewTantuster,
  updateNewTantusterField,
  getNewTantusterField,
  createExerciseNewTantuster,
  createIdiom,
  getAllIdiom,
  deleteIdiom,
  updateIdiomField,
  getIdiomField,
  createExerciseIdiom,
  updateIdiom,
  getSingleIdiom,
};
