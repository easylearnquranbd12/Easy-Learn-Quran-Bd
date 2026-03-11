const { ObjectId } = require("mongodb");
const {
  getSixLayerVocabularyFormatCollection,
  getSixLayerElegantFormatFieldsCollection,
  getSixLayerVocabularyFormatField,
  getSixLayerVocabularyFormatExerciseCollection,
  getSixLayerIdiomFormatCollection,
  getSixLayerIdiomFormatExerciseCollection,
  getSixLayerElegantFormatCollection,
  getSixLayerElegantFormatExerciseCollection,
  getSixLayerTantusterFormatFieldsCollection,
  getSixLayerTantusterFormatCollection,
  getSixLayerTantusterFormatExerciseCollection,
  getSixLayerNewTantusterFormatFieldsCollection,
  getSixLayerNewTantusterFormatCollection,
  getSixLayerNewTantusterFormatExerciseCollection,
  getSixLayerIdiomFormatField,
} = require("../config/db");

// vocabulary
const vocabularyFormatFieldCollection = getSixLayerVocabularyFormatField();
const vocabularyFormatCollection = getSixLayerVocabularyFormatCollection();
const vocabularyFormatExercise =
  getSixLayerVocabularyFormatExerciseCollection();

// idiom
const idiomFormatFieldCollection = getSixLayerIdiomFormatField();
const idiomFormatCollection = getSixLayerIdiomFormatCollection();
const idiomFormatExercise = getSixLayerIdiomFormatExerciseCollection();

// elegant
const elegantFormatFieldCollection = getSixLayerElegantFormatFieldsCollection();
const elegantFormatCollection = getSixLayerElegantFormatCollection();
const elegantFormatExercise = getSixLayerElegantFormatExerciseCollection();
// Tantuster
const tantusterFormatFieldCollection =
  getSixLayerTantusterFormatFieldsCollection();
const tantusterFormatCollection = getSixLayerTantusterFormatCollection();
const tantusterFormatExerciseCollection =
  getSixLayerTantusterFormatExerciseCollection();
// New Tantuster
const newTantusterFormatFieldCollection =
  getSixLayerNewTantusterFormatFieldsCollection();
const newTantusterFormatCollection = getSixLayerNewTantusterFormatCollection();
const newTantusterFormatExerciseCollection =
  getSixLayerNewTantusterFormatExerciseCollection();

// Second Layer copy
// sentence
// const sentenceFormatFieldsCollection = getSecondLayersentenceFormatFieldsCollection();
// const sentenceFormatCollection = getSecondLayersentenceFormatCollection();
// const sentenceFormatExerciseCollection = getSecondLayersentenceFormatExerciseCollection();
// // Verb
// const verbFormatFieldsCollection = getSecondLayerverbFormatFieldsCollection();
// const verbFormatCollection = getSecondLayerverbFormatCollection();
// const verbFormatExerciseCollection = getSecondLayerverbFormatExerciseCollection();
// // Article
// const articleFormatFieldsCollection = getSecondLayerarticleFormatFieldsCollection();
// const articleFormatCollection = getSecondLayerarticleFormatCollection();
// const articleFormatExerciseCollection = getSecondLayerarticleFormatExerciseCollection();
// // Tense
// const tenseFormatFieldsCollection = getSecondLayertenseFormatFieldsCollection();
// const tenseFormatCollection = getSecondLayertenseFormatCollection();
// const tenseFormatExerciseCollection = getSecondLayertenseFormatExerciseCollection();
// // Perposition
// const prepositionFormatFieldsCollection = getSecondLayerprepositionFormatFieldsCollection();
// const prepositionFormatCollection = getSecondLayerprepositionFormatCollection();
// const prepositionFormatExerciseCollection =
//   getSecondLayerprepositionFormatExerciseCollection();





// Idiom
// ✅ Create Idiom format
const createIdiomFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await idiomFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Idiom
const getAllIdiomFormat = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const total = await idiomFormatCollection.countDocuments();
    const result = await idiomFormatCollection
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Idiom
const deleteIdiomFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await idiomFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });

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
const updateIdiomFormatField = async (req, res) => {
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
      const doc = await idiomFormatFieldCollection.findOne({});
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

    const result = await idiomFormatFieldCollection.updateOne(
      {},
      { $set: updateData },
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
// ✅ Get Idiom Fields
const getIdiomFormatField = async (req, res) => {
  try {
    const result = await idiomFormatFieldCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Single Idiom by ID
const getSingleIdiomFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await idiomFormatCollection.findOne({
      _id: new ObjectId(id),
    });

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

const updateIdiomFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await idiomFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
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

// Exercise Controller

const createExerciseIdiomFormat = async (req, res) => {
  try {
    const { user, rows } = req.body;

    if (!user || !rows || !Array.isArray(rows)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. user and rows are required.",
      });
    }

    const data = {
      user, // who created
      rows, // 3 rows of exercise
      createdAt: new Date(), // timestamp for TTL
    };

    // Insert exercise
    const result = await idiomFormatExercise.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await idiomExercise.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
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
// ✅ Get All Exercise Idiom
const getAllExerciseIdiomFormat = async (req, res) => {
  try {
    const result = await idiomFormatExercise
      .find()
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    res.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error getting exercise vocabulary:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Exercise Idiom
const deleteExerciseIdiomFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await idiomFormatExercise.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Vocabulary
// ✅ Create Vocabulary
const createVocabularyFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await vocabularyFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllVocabularyFormat = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const total = await vocabularyFormatCollection.countDocuments();
    const result = await vocabularyFormatCollection
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Vocabulary
const deleteVocabularyFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await vocabularyFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });

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
const updateVocabularyFormatField = async (req, res) => {
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
      const doc = await vocabularyFormatFieldCollection.findOne({});
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

    const result = await vocabularyFormatFieldCollection.updateOne(
      {},
      { $set: updateData },
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
const getVocabularyFormatField = async (req, res) => {
  try {
    const result = await vocabularyFormatFieldCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Single Vocabulary by ID
const getSingleVocabularyFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await vocabularyFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Vocabulary not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateVocabularyFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await vocabularyFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vocabulary not found",
      });
    }

    res.json({
      success: true,
      message: "Vocabulary updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Exercise Controller
const createExerciseVocabularyFormat = async (req, res) => {
  try {
    const { user, rows } = req.body;

    if (!user || !rows || !Array.isArray(rows)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. user and rows are required.",
      });
    }

    const data = {
      user, // who created
      rows, // 3 rows of exercise
      createdAt: new Date(), // timestamp for TTL
    };

    // Insert exercise
    const result = await vocabularyFormatExercise.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await vocabularyFormatExercise.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
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

// ✅ Get All Exercise Vocabulary
const getAllExerciseVocabularyFormat = async (req, res) => {
  try {
    const result = await vocabularyFormatExercise
      .find()
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    res.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error getting exercise vocabulary:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Exercise Vocabulary
const deleteExerciseVocabularyFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await vocabularyFormatExercise.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Elegant
// ✅ Create Elegant
const createElegantFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await elegantFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Elegant with Pagination
const getAllElegantFormat = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const total = await elegantFormatCollection.countDocuments();
    const result = await elegantFormatCollection
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Elegant
const deleteElegantFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await elegantFormatCollection.deleteOne({
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
const updateElegantFormatField = async (req, res) => {
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
      const doc = await elegantFormatFieldCollection.findOne({});
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

    const result = await elegantFormatFieldCollection.updateOne(
      {},
      { $set: updateData },
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
const getElegantFormatField = async (req, res) => {
  try {
    const result = await elegantFormatFieldCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Single Elegant by ID
const getSingleElegantFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await elegantFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Elegant not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateElegantFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await elegantFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Elegant not found",
      });
    }

    res.json({
      success: true,
      message: "Vocabulary updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Exercise Controller
const createExerciseElegantFormat = async (req, res) => {
  try {
    const { user, rows } = req.body;

    if (!user || !rows || !Array.isArray(rows)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. user and rows are required.",
      });
    }

    const data = {
      user, // who created
      rows, // 3 rows of exercise
      createdAt: new Date(), // timestamp for TTL
    };

    // Insert exercise
    const result = await elegantFormatExercise.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await elegantFormatExercise.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
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
// ✅ Get All Exercise Elegant
const getAllExerciseElegantFormat = async (req, res) => {
  try {
    const result = await elegantFormatExercise
      .find()
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    res.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error getting exercise vocabulary:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Exercise Elegant
const deleteExerciseElegantFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await elegantFormatExercise.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Tantuster
// ✅ Create Tantuster
const createTantusterFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await tantusterFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tantuster
const getAllTantusterFormat = async (req, res) => {
  try {
    const result = await tantusterFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tantuster
const deleteTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tantusterFormatCollection.deleteOne({
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
const updateTantusterFormatField = async (req, res) => {
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
      const doc = await tantusterFormatFieldCollection.findOne({});
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

    const result = await tantusterFormatFieldCollection.updateOne(
      {},
      { $set: updateData },
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
const getTantusterFormatField = async (req, res) => {
  try {
    const result = await tantusterFormatFieldCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await tantusterFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Tantuster not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await tantusterFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Tantuster not found",
      });
    }

    res.json({
      success: true,
      message: "Tantuster updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Exercise Controller
const createExerciseTantusterFormat = async (req, res) => {
  try {
    const { user, rows } = req.body;

    if (!user || !rows || !Array.isArray(rows)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. user and rows are required.",
      });
    }

    const data = {
      user, // who created
      rows, // 3 rows of exercise
      createdAt: new Date(), // timestamp for TTL
    };

    // Insert exercise
    const result = await tantusterFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await tantusterFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
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
// ✅ Get All Exercise Tantuster
const getAllExerciseTantusterFormat = async (req, res) => {
  try {
    const result = await tantusterFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    res.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error getting exercise vocabulary:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Exercise Tantuster
const deleteExerciseTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await tantusterFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//New Tantuster
// ✅ New Create Tantuster
const createNewTantusterFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await newTantusterFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tantuster
const getAllNewTantusterFormat = async (req, res) => {
  try {
    const result = await newTantusterFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tantuster
const deleteNewTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await newTantusterFormatCollection.deleteOne({
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
const updateNewTantusterFormatField = async (req, res) => {
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
      const doc = await newTantusterFormatFieldCollection.findOne({});
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

    const result = await newTantusterFormatFieldCollection.updateOne(
      {},
      { $set: updateData },
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
const getNewTantusterFormatField = async (req, res) => {
  try {
    const result = await newTantusterFormatFieldCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingleNewTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await newTantusterFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Tantuster not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNewTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await newTantusterFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Tantuster not found",
      });
    }

    res.json({
      success: true,
      message: "Tantuster updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
// Exercise Controller
const createExerciseNewTantusterFormat = async (req, res) => {
  try {
    const { user, rows } = req.body;

    if (!user || !rows || !Array.isArray(rows)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. user and rows are required.",
      });
    }

    const data = {
      user, // who created
      rows, // 3 rows of exercise
      createdAt: new Date(), // timestamp for TTL
    };

    // Insert exercise
    const result = await newTantusterFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await newTantusterFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
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
// ✅ Get All Exercise Tantuster
const getAllExerciseNewTantusterFormat = async (req, res) => {
  try {
    const result = await newTantusterFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    res.json({
      success: true,
      total: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error getting exercise vocabulary:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Delete Exercise New Tantuster
const deleteExerciseNewTantusterFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await newTantusterFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Second Layer Copy


// Sentence
// // ✅ Create Sentence
// const createSentenceFormat = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await sentenceFormatCollection.insertOne(data);

//     res.status(201).json({ success: true, id: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get All Sentence
// const getAllSentenceFormat = async (req, res) => {
//   try {
//     const result = await sentenceFormatCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Delete Sentence
// const deleteSentenceFormat = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await sentenceFormatCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Sentence not found" });
//     }

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Update Sentence Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
// const updateSentenceFormatField = async (req, res) => {
//   try {
//     const { fieldName, value } = req.body;

//     if (!fieldName) {
//       return res
//         .status(400)
//         .json({ success: false, message: "fieldName is required" });
//     }

//     let updateData = {};

//     if (fieldName === "isActive") {
//       // যদি isActive update হয়, toggle কর
//       const doc = await sentenceFormatFieldsCollection.findOne({});
//       if (!doc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "No vocabulary found" });
//       }

//       updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
//     } else {
//       if (!value) {
//         return res.status(400).json({
//           success: false,
//           message: "value is required for this field",
//         });
//       }
//       updateData[fieldName] = value;
//     }

//     const result = await sentenceFormatFieldsCollection.updateOne(
//       {},
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No vocabulary found to update" });
//     }

//     res.json({
//       success: true,
//       message:
//         fieldName === "isActive"
//           ? `isActive toggled successfully`
//           : `${fieldName} updated successfully`,
//       updatedValue: updateData[fieldName],
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const updateSentence = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (!Object.keys(updateData).length) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields provided for update",
//       });
//     }

//     const result = await sentenceFormatCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Sentence not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Sentence updated successfully",
//       updatedData: updateData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get Sentence Fields
// const getSentenceFormatField = async (req, res) => {
//   try {
//     const result = await sentenceFormatFieldsCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getSingleSentence = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await sentenceFormatCollection.findOne({ _id: new ObjectId(id) });
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Sentence not found" });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const createExerciseSentenceFormat = async (req, res) => {
//   try {
//     const { user, rows } = req.body;

//     if (!user || !rows || !Array.isArray(rows)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payload. user and rows are required.",
//       });
//     }

//     const data = {
//       user, // who created
//       rows, // 3 rows of exercise
//       createdAt: new Date(), // timestamp for TTL
//     };

//     // Insert exercise
//     const result = await sentenceFormatExerciseCollection.insertOne(data);
//     // ✅ Create TTL index if not exists (safe to run multiple times)
//     await sentenceFormatExerciseCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
//     );
//     res.status(201).json({
//       success: true,
//       id: result.insertedId,
//       message: "Exercise created. It will auto-delete after 30 days.",
//     });
//   } catch (error) {
//     console.error("Error creating exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Get All Exercise Sentence
// const getAllExerciseSentence = async (req, res) => {
//   try {
//     const result = await sentenceFormatExerciseCollection
//       .find()
//       .sort({ createdAt: -1 }) // latest first
//       .toArray();

//     res.json({
//       success: true,
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error getting exercise vocabulary:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Delete Exercise Sentence
// const deleteExerciseSentence = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await sentenceFormatExerciseCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Exercise not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Exercise deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Verb
// // ✅ Create Verb
// const createVerb = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await verbFormatCollection.insertOne(data);

//     res.status(201).json({ success: true, id: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get All Verb
// const getAllVerb = async (req, res) => {
//   try {
//     const result = await verbFormatCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Delete Verb
// const deleteVerb = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await verbFormatCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Sentence not found" });
//     }

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Update Verb Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
// const updateVerbField = async (req, res) => {
//   try {
//     const { fieldName, value } = req.body;

//     if (!fieldName) {
//       return res
//         .status(400)
//         .json({ success: false, message: "fieldName is required" });
//     }

//     let updateData = {};

//     if (fieldName === "isActive") {
//       // যদি isActive update হয়, toggle কর
//       const doc = await verbFormatFieldsCollection.findOne({});
//       if (!doc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "No vocabulary found" });
//       }

//       updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
//     } else {
//       if (!value) {
//         return res.status(400).json({
//           success: false,
//           message: "value is required for this field",
//         });
//       }
//       updateData[fieldName] = value;
//     }

//     const result = await verbFormatFieldsCollection.updateOne(
//       {},
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No vocabulary found to update" });
//     }

//     res.json({
//       success: true,
//       message:
//         fieldName === "isActive"
//           ? `isActive toggled successfully`
//           : `${fieldName} updated successfully`,
//       updatedValue: updateData[fieldName],
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get Verb Fields
// const getVerbField = async (req, res) => {
//   try {
//     const result = await verbFormatFieldsCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const updateVerb = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (!Object.keys(updateData).length) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields provided for update",
//       });
//     }

//     const result = await verbFormatCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Verb not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Verb updated successfully",
//       updatedData: updateData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getSingleVerb = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await verbFormatCollection.findOne({ _id: new ObjectId(id) });
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Verb not found" });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const createExerciseVerb = async (req, res) => {
//   try {
//     const { user, rows } = req.body;

//     if (!user || !rows || !Array.isArray(rows)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payload. user and rows are required.",
//       });
//     }

//     const data = {
//       user, // who created
//       rows, // 3 rows of exercise
//       createdAt: new Date(), // timestamp for TTL
//     };

//     // Insert exercise
//     const result = await verbFormatExerciseCollection.insertOne(data);
//     // ✅ Create TTL index if not exists (safe to run multiple times)
//     await verbFormatExerciseCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
//     );
//     res.status(201).json({
//       success: true,
//       id: result.insertedId,
//       message: "Exercise created. It will auto-delete after 30 days.",
//     });
//   } catch (error) {
//     console.error("Error creating exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Get All Exercise Verb
// const getAllExerciseVerb = async (req, res) => {
//   try {
//     const result = await verbFormatExerciseCollection
//       .find()
//       .sort({ createdAt: -1 }) // latest first
//       .toArray();

//     res.json({
//       success: true,
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error getting exercise vocabulary:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Delete Exercise Verb
// const deleteExerciseVerb = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await verbFormatExerciseCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Exercise not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Exercise deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Article
// // ✅ Create Article
// const createArticle = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await articleFormatCollection.insertOne(data);

//     res.status(201).json({ success: true, id: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get All Article
// const getAllArticle = async (req, res) => {
//   try {
//     const result = await articleFormatCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Delete Article
// const deleteArticle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await articleFormatCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Article not found" });
//     }

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Update Article Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
// const updateArticleField = async (req, res) => {
//   try {
//     const { fieldName, value } = req.body;

//     if (!fieldName) {
//       return res
//         .status(400)
//         .json({ success: false, message: "fieldName is required" });
//     }

//     let updateData = {};

//     if (fieldName === "isActive") {
//       // যদি isActive update হয়, toggle কর
//       const doc = await articleFormatFieldsCollection.findOne({});
//       if (!doc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "No Article found" });
//       }

//       updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
//     } else {
//       if (!value) {
//         return res.status(400).json({
//           success: false,
//           message: "value is required for this field",
//         });
//       }
//       updateData[fieldName] = value;
//     }

//     const result = await articleFormatFieldsCollection.updateOne(
//       {},
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No Article found to update" });
//     }

//     res.json({
//       success: true,
//       message:
//         fieldName === "isActive"
//           ? `isActive toggled successfully`
//           : `${fieldName} updated successfully`,
//       updatedValue: updateData[fieldName],
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get Article Fields
// const getArticleField = async (req, res) => {
//   try {
//     const result = await articleFormatFieldsCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const updateArticle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (!Object.keys(updateData).length) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields provided for update",
//       });
//     }

//     const result = await articleFormatCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Article updated successfully",
//       updatedData: updateData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getSingleArticle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await articleFormatCollection.findOne({ _id: new ObjectId(id) });
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Article not found" });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const createExerciseArticle = async (req, res) => {
//   try {
//     const { user, rows } = req.body;

//     if (!user || !rows || !Array.isArray(rows)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payload. user and rows are required.",
//       });
//     }

//     const data = {
//       user, // who created
//       rows, // 3 rows of exercise
//       createdAt: new Date(), // timestamp for TTL
//     };

//     // Insert exercise
//     const result = await articleFormatExerciseCollection.insertOne(data);
//     // ✅ Create TTL index if not exists (safe to run multiple times)
//     await articleFormatExerciseCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
//     );
//     res.status(201).json({
//       success: true,
//       id: result.insertedId,
//       message: "Exercise created. It will auto-delete after 30 days.",
//     });
//   } catch (error) {
//     console.error("Error creating exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Get All Exercise Article
// const getAllExerciseArticle = async (req, res) => {
//   try {
//     const result = await articleFormatExerciseCollection
//       .find()
//       .sort({ createdAt: -1 }) // latest first
//       .toArray();

//     res.json({
//       success: true,
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error getting exercise vocabulary:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Delete Exercise Article
// const deleteExerciseArticle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await articleFormatExerciseCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Exercise not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Exercise deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // Tense
// // ✅ Create Tense
// const createTense = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await tenseFormatCollection.insertOne(data);

//     res.status(201).json({ success: true, id: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get All Tense
// const getAllTense = async (req, res) => {
//   try {
//     const result = await tenseFormatCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Delete Tense
// const deleteTense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await tenseFormatCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Tense not found" });
//     }

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Update Tense Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
// const updateTenseField = async (req, res) => {
//   try {
//     const { fieldName, value } = req.body;

//     if (!fieldName) {
//       return res
//         .status(400)
//         .json({ success: false, message: "fieldName is required" });
//     }

//     let updateData = {};

//     if (fieldName === "isActive") {
//       // যদি isActive update হয়, toggle কর
//       const doc = await tenseFormatFieldsCollection.findOne({});
//       if (!doc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "No Tense found" });
//       }

//       updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
//     } else {
//       if (!value) {
//         return res.status(400).json({
//           success: false,
//           message: "value is required for this field",
//         });
//       }
//       updateData[fieldName] = value;
//     }

//     const result = await tenseFormatFieldsCollection.updateOne(
//       {},
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No Tense found to update" });
//     }

//     res.json({
//       success: true,
//       message:
//         fieldName === "isActive"
//           ? `isActive toggled successfully`
//           : `${fieldName} updated successfully`,
//       updatedValue: updateData[fieldName],
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get Tense Fields
// const getTenseField = async (req, res) => {
//   try {
//     const result = await tenseFormatFieldsCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const updateTense = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (!Object.keys(updateData).length) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields provided for update",
//       });
//     }

//     const result = await tenseFormatCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Tense not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Tense updated successfully",
//       updatedData: updateData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getSingleTense = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await tenseFormatCollection.findOne({ _id: new ObjectId(id) });
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Tense not found" });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const createExerciseTense = async (req, res) => {
//   try {
//     const { user, rows } = req.body;

//     if (!user || !rows || !Array.isArray(rows)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payload. user and rows are required.",
//       });
//     }

//     const data = {
//       user, // who created
//       rows, // 3 rows of exercise
//       createdAt: new Date(), // timestamp for TTL
//     };

//     // Insert exercise
//     const result = await tenseFormatExerciseCollection.insertOne(data);
//     // ✅ Create TTL index if not exists (safe to run multiple times)
//     await tenseFormatExerciseCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
//     );
//     res.status(201).json({
//       success: true,
//       id: result.insertedId,
//       message: "Exercise created. It will auto-delete after 30 days.",
//     });
//   } catch (error) {
//     console.error("Error creating exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Get All Exercise Tense
// const getAllExerciseTense = async (req, res) => {
//   try {
//     const result = await tenseFormatExerciseCollection
//       .find()
//       .sort({ createdAt: -1 }) // latest first
//       .toArray();

//     res.json({
//       success: true,
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error getting exercise vocabulary:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Delete Exercise Tense
// const deleteExerciseTense = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await tenseFormatExerciseCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Exercise not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Exercise deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // Preposition
// // ✅ Create Preposition
// const createPreposition = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await prepositionFormatCollection.insertOne(data);

//     res.status(201).json({ success: true, id: result.insertedId });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Get All Preposition
// const getAllPreposition = async (req, res) => {
//   try {
//     const result = await prepositionFormatCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Delete Preposition
// const deletePreposition = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await prepositionFormatCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Preposition not found" });
//     }

//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ Update Preposition Field (like synonyms, antonyms, exampleEnglish, exampleBangla, isActive)
// const updatePrepositionField = async (req, res) => {
//   try {
//     const { fieldName, value } = req.body;

//     if (!fieldName) {
//       return res
//         .status(400)
//         .json({ success: false, message: "fieldName is required" });
//     }

//     let updateData = {};

//     if (fieldName === "isActive") {
//       // যদি isActive update হয়, toggle কর
//       const doc = await prepositionFormatFieldsCollection.findOne({});
//       if (!doc) {
//         return res
//           .status(404)
//           .json({ success: false, message: "No Preposition found" });
//       }

//       updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
//     } else {
//       if (!value) {
//         return res.status(400).json({
//           success: false,
//           message: "value is required for this field",
//         });
//       }
//       updateData[fieldName] = value;
//     }

//     const result = await prepositionFormatFieldsCollection.updateOne(
//       {},
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No Tense found to update" });
//     }

//     res.json({
//       success: true,
//       message:
//         fieldName === "isActive"
//           ? `isActive toggled successfully`
//           : `${fieldName} updated successfully`,
//       updatedValue: updateData[fieldName],
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // ✅ Get Preposition Fields
// const getPrepositionField = async (req, res) => {
//   try {
//     const result = await prepositionFormatFieldsCollection.find().toArray();
//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data

// const updatePreposition = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     if (!Object.keys(updateData).length) {
//       return res.status(400).json({
//         success: false,
//         message: "No fields provided for update",
//       });
//     }

//     const result = await prepositionFormatCollection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData },
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Preposition not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Preposition updated successfully",
//       updatedData: updateData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getSinglePreposition = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await prepositionFormatCollection.findOne({
//       _id: new ObjectId(id),
//     });
//     if (!result) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Preposition not found" });
//     }

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Temporary Exercise data
// const createExercisePreposition = async (req, res) => {
//   try {
//     const { user, rows } = req.body;

//     if (!user || !rows || !Array.isArray(rows)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payload. user and rows are required.",
//       });
//     }

//     const data = {
//       user, // who created
//       rows, // 3 rows of exercise
//       createdAt: new Date(), // timestamp for TTL
//     };

//     // Insert exercise
//     const result = await prepositionFormatExerciseCollection.insertOne(data);
//     // ✅ Create TTL index if not exists (safe to run multiple times)
//     await prepositionFormatExerciseCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 * 24 * 60 * 60 }, // 30 days
//     );
//     res.status(201).json({
//       success: true,
//       id: result.insertedId,
//       message: "Exercise created. It will auto-delete after 30 days.",
//     });
//   } catch (error) {
//     console.error("Error creating exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Get All Exercise Preposition
// const getAllExercisePreposition = async (req, res) => {
//   try {
//     const result = await prepositionFormatExerciseCollection
//       .find()
//       .sort({ createdAt: -1 }) // latest first
//       .toArray();

//     res.json({
//       success: true,
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error getting exercise vocabulary:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // ✅ Delete Exercise Preposition
// const deleteExercisePreposition = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await prepositionFormatExerciseCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Exercise not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Exercise deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
module.exports = {
  createVocabularyFormat,
  getAllVocabularyFormat,
  getSingleVocabularyFormat,
  deleteVocabularyFormat,
  updateVocabularyFormatField,
  getVocabularyFormatField,
  createExerciseVocabularyFormat,
  createElegantFormat,
  getAllElegantFormat,
  deleteElegantFormat,
  updateElegantFormatField,
  getElegantFormatField,
  createExerciseElegantFormat,
  createTantusterFormat,
  getAllTantusterFormat,
  deleteTantusterFormat,
  updateTantusterFormatField,
  getTantusterFormatField,
  createExerciseTantusterFormat,
  createNewTantusterFormat,
  getAllNewTantusterFormat,
  deleteNewTantusterFormat,
  updateNewTantusterFormatField,
  getNewTantusterFormatField,
  createExerciseNewTantusterFormat,
  createIdiomFormat,
  getAllIdiomFormat,
  deleteIdiomFormat,
  updateIdiomFormatField,
  getIdiomFormatField,
  createExerciseIdiomFormat,
  updateIdiomFormat,
  getSingleIdiomFormat,
  updateVocabularyFormat,
  getSingleElegantFormat,
  updateElegantFormat,
  getSingleTantusterFormat,
  updateTantusterFormat,
  getSingleNewTantusterFormat,
  updateNewTantusterFormat,
  getAllExerciseVocabularyFormat,
  deleteExerciseVocabularyFormat,
  getAllExerciseElegantFormat,
  deleteExerciseElegantFormat,
  getAllExerciseTantusterFormat,
  deleteExerciseTantusterFormat,
  getAllExerciseNewTantusterFormat,
  deleteExerciseNewTantusterFormat,
  getAllExerciseIdiomFormat,
  deleteExerciseIdiomFormat,
  // Second Layer Copy
  // createSentenceFormat,
  // getAllSentenceFormat,
  // deleteSentenceFormat,
  // updateSentenceFormatField,
  // getSentenceFormatField,
  // createExerciseSentenceFormat,
  // createVerb,
  // getAllVerb,
  // deleteVerb,
  // updateVerbField,
  // getVerbField,
  // createExerciseVerb,
  // createArticle,
  // getAllArticle,
  // deleteArticle,
  // updateArticleField,
  // getArticleField,
  // createExerciseArticle,
  // createTense,
  // getAllTense,
  // deleteTense,
  // updateTenseField,
  // getTenseField,
  // createExerciseTense,
  // createPreposition,
  // getAllPreposition,
  // deletePreposition,
  // updatePrepositionField,
  // getPrepositionField,
  // createExercisePreposition,
  // updateSentence,
  // getSingleSentence,
  // updateVerb,
  // getSingleVerb,
  // updateArticle,
  // getSingleArticle,
  // updateTense,
  // getSingleTense,
  // updatePreposition,
  // getSinglePreposition,
  // getAllExerciseSentence,
  // deleteExerciseSentence,
  // getAllExerciseVerb,
  // deleteExerciseVerb,
  // getAllExerciseArticle,
  // deleteExerciseArticle,
  // getAllExerciseTense,
  // deleteExerciseTense,
  // getAllExercisePreposition,
  // deleteExercisePreposition,
};
