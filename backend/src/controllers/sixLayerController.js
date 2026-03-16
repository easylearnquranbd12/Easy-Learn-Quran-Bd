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
  getSixLayerSentenceFormatFieldsCollection,
  getSixLayerSentenceFormatCollection,
  getSixLayerSentenceFormatExerciseCollection,
  getSixLayerVerbFormatFieldsCollection,
  getSixLayerVerbFormatCollection,
  getSixLayerVerbFormatExerciseCollection,
  getSixLayerArticleFormatFieldsCollection,
  getSixLayerArticleFormatCollection,
  getSixLayerArticleFormatExerciseCollection,
  getSixLayerTenseFormatFieldsCollection,
  getSixLayerTenseFormatCollection,
  getSixLayerTenseFormatExerciseCollection,
  getSixLayerPrepositionFormatFieldsCollection,
  getSixLayerPrepositionFormatCollection,
  getSixLayerPrepositionFormatExerciseCollection,
  getSixLayerBeforeProfessionalFormatFieldsCollection,
  getSixLayerBeforeProfessionalFormatCollection,
  getSixLayerBeforeProfessionalFormatExerciseCollection,
  getSixLayerCorporateEmailFormatFieldsCollection,
  getSixLayerCorporateEmailFormatCollection,
  getSixLayerCorporateEmailFormatExerciseCollection,
  getSixLayerDevelopSkillsFormatFieldsCollection,
  getSixLayerDevelopSkillsFormatCollection,
  getSixLayerDevelopSkillsFormatExerciseCollection,
  getSixLayerGoodLifeStyleFormatFieldsCollection,
  getSixLayerGoodLifeStyleFormatCollection,
  getSixLayerGoodLifeStyleFormatExerciseCollection,
  getSixLayerInterviewQuestionsFormatFieldsCollection,
  getSixLayerInterviewQuestionsFormatCollection,
  getSixLayerInterviewQuestionsFormatExerciseCollection,
  getSixLayerIdeaSharesFormatFieldsCollection,
  getSixLayerIdeaSharesFormatCollection,
  getSixLayerIdeaSharesFormatExerciseCollection,
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
const sentenceFormatFieldsCollection =
  getSixLayerSentenceFormatFieldsCollection();
const sentenceFormatCollection = getSixLayerSentenceFormatCollection();
const sentenceFormatExerciseCollection =
  getSixLayerSentenceFormatExerciseCollection();
// Verb
const verbFormatFieldsCollection = getSixLayerVerbFormatFieldsCollection();
const verbFormatCollection = getSixLayerVerbFormatCollection();
const verbFormatExerciseCollection = getSixLayerVerbFormatExerciseCollection();
// Article
const articleFormatFieldsCollection =
  getSixLayerArticleFormatFieldsCollection();
const articleFormatCollection = getSixLayerArticleFormatCollection();
const articleFormatExerciseCollection =
  getSixLayerArticleFormatExerciseCollection();
// Tense
const tenseFormatFieldsCollection = getSixLayerTenseFormatFieldsCollection();
const tenseFormatCollection = getSixLayerTenseFormatCollection();
const tenseFormatExerciseCollection =
  getSixLayerTenseFormatExerciseCollection();
// Perposition
const prepositionFormatFieldsCollection =
  getSixLayerPrepositionFormatFieldsCollection();
const prepositionFormatCollection = getSixLayerPrepositionFormatCollection();
const prepositionFormatExerciseCollection =
  getSixLayerPrepositionFormatExerciseCollection();

// third layer format
// before professional
const beforeProfessionalFormatFieldsCollection =
  getSixLayerBeforeProfessionalFormatFieldsCollection();
const beforeProfessionalFormatCollection =
  getSixLayerBeforeProfessionalFormatCollection();
const beforeProfessionalFormatExerciseCollection =
  getSixLayerBeforeProfessionalFormatExerciseCollection();
// Corporate email Format
const corporateEmailFormatFieldsCollection =
  getSixLayerCorporateEmailFormatFieldsCollection();
const corporateEmailFormatCollection =
  getSixLayerCorporateEmailFormatCollection();
const corporateEmailFormatExerciseCollection =
  getSixLayerCorporateEmailFormatExerciseCollection();
// Develop skills Format
const developSkillsFormatFieldsCollection =
  getSixLayerDevelopSkillsFormatFieldsCollection();
const developSkillsFormatCollection =
  getSixLayerDevelopSkillsFormatCollection();
const developSkillsFormatExerciseCollection =
  getSixLayerDevelopSkillsFormatExerciseCollection();
// Good life style Format
const goodLifeStyleFormatFieldsCollection =
  getSixLayerGoodLifeStyleFormatFieldsCollection();
const goodLifeStyleFormatCollection =
  getSixLayerGoodLifeStyleFormatCollection();
const goodLifeStyleFormatExerciseCollection =
  getSixLayerGoodLifeStyleFormatExerciseCollection();
// Interview Questions Format
const interviewQuestionsFormatFieldsCollection =
  getSixLayerInterviewQuestionsFormatFieldsCollection();
const interviewQuestionsFormatCollection =
  getSixLayerInterviewQuestionsFormatCollection();
const interviewQuestionsFormatExerciseCollection =
  getSixLayerInterviewQuestionsFormatExerciseCollection();
// Idea Shares Format
const ideaSharesFormatFieldsCollection =
  getSixLayerIdeaSharesFormatFieldsCollection();
const ideaSharesFormatCollection = getSixLayerIdeaSharesFormatCollection();
const ideaSharesFormatExerciseCollection =
  getSixLayerIdeaSharesFormatExerciseCollection();

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
// ✅ Create Sentence
const createSentenceFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await sentenceFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Sentence
const getAllSentenceFormat = async (req, res) => {
  try {
    const result = await sentenceFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Sentence
const deleteSentenceFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sentenceFormatCollection.deleteOne({
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
const updateSentenceFormatField = async (req, res) => {
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
      const doc = await sentenceFormatFieldsCollection.findOne({});
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

    const result = await sentenceFormatFieldsCollection.updateOne(
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
const updateSentenceFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await sentenceFormatCollection.updateOne(
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
const getSentenceFormatField = async (req, res) => {
  try {
    const result = await sentenceFormatFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingleSentenceFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sentenceFormatCollection.findOne({
      _id: new ObjectId(id),
    });
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
const createExerciseSentenceFormat = async (req, res) => {
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
    const result = await sentenceFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await sentenceFormatExerciseCollection.createIndex(
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
// ✅ Get All Exercise Sentence
const getAllExerciseSentenceFormat = async (req, res) => {
  try {
    const result = await sentenceFormatExerciseCollection
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
// ✅ Delete Exercise Sentence
const deleteExerciseSentenceFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sentenceFormatExerciseCollection.deleteOne({
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

// Verb
// ✅ Create Verb
const createVerbFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await verbFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Verb
const getAllVerbFormat = async (req, res) => {
  try {
    const result = await verbFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Verb
const deleteVerbFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await verbFormatCollection.deleteOne({
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
const updateVerbFormatField = async (req, res) => {
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
      const doc = await verbFormatFieldsCollection.findOne({});
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

    const result = await verbFormatFieldsCollection.updateOne(
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
// ✅ Get Verb Fields
const getVerbFormatField = async (req, res) => {
  try {
    const result = await verbFormatFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateVerbFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await verbFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Verb not found",
      });
    }

    res.json({
      success: true,
      message: "Verb updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingleVerbFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await verbFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Verb not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const createExerciseVerbFormat = async (req, res) => {
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
    const result = await verbFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await verbFormatExerciseCollection.createIndex(
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
// ✅ Get All Exercise Verb
const getAllExerciseVerbFormat = async (req, res) => {
  try {
    const result = await verbFormatExerciseCollection
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
// ✅ Delete Exercise Verb
const deleteExerciseVerbFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await verbFormatExerciseCollection.deleteOne({
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

// Article
// ✅ Create Article
const createArticleFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await articleFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Article
const getAllArticleFormat = async (req, res) => {
  try {
    const result = await articleFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Article
const deleteArticleFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await articleFormatCollection.deleteOne({
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
const updateArticleFormatField = async (req, res) => {
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
      const doc = await articleFormatFieldsCollection.findOne({});
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

    const result = await articleFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
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
const getArticleFormatField = async (req, res) => {
  try {
    const result = await articleFormatFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const updateArticleFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await articleFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.json({
      success: true,
      message: "Article updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingleArticleFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await articleFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const createExerciseArticleFormat = async (req, res) => {
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
    const result = await articleFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await articleFormatExerciseCollection.createIndex(
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
// ✅ Get All Exercise Article
const getAllExerciseArticleFormat = async (req, res) => {
  try {
    const result = await articleFormatExerciseCollection
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
// ✅ Delete Exercise Article
const deleteExerciseArticleFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await articleFormatExerciseCollection.deleteOne({
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
// Tense
// ✅ Create Tense
const createTenseFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await tenseFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Tense
const getAllTenseFormat = async (req, res) => {
  try {
    const result = await tenseFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Tense
const deleteTenseFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tenseFormatCollection.deleteOne({
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
const updateTenseFormatField = async (req, res) => {
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
      const doc = await tenseFormatFieldsCollection.findOne({});
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

    const result = await tenseFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
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
const getTenseFormatField = async (req, res) => {
  try {
    const result = await tenseFormatFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const updateTenseFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await tenseFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Tense not found",
      });
    }

    res.json({
      success: true,
      message: "Tense updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingleTenseFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await tenseFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Tense not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const createExerciseTenseFormat = async (req, res) => {
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
    const result = await tenseFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await tenseFormatExerciseCollection.createIndex(
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
// ✅ Get All Exercise Tense
const getAllExerciseTenseFormat = async (req, res) => {
  try {
    const result = await tenseFormatExerciseCollection
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
// ✅ Delete Exercise Tense
const deleteExerciseTenseFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await tenseFormatExerciseCollection.deleteOne({
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
// Preposition
// ✅ Create Preposition
const createPrepositionFormat = async (req, res) => {
  try {
    const data = req.body;
    const result = await prepositionFormatCollection.insertOne(data);

    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Preposition
const getAllPrepositionFormat = async (req, res) => {
  try {
    const result = await prepositionFormatCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Preposition
const deletePrepositionFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prepositionFormatCollection.deleteOne({
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
const updatePrepositionFormatField = async (req, res) => {
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
      const doc = await prepositionFormatFieldsCollection.findOne({});
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

    const result = await prepositionFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
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
const getPrepositionFormatField = async (req, res) => {
  try {
    const result = await prepositionFormatFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data

const updatePrepositionFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }

    const result = await prepositionFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Preposition not found",
      });
    }

    res.json({
      success: true,
      message: "Preposition updated successfully",
      updatedData: updateData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSinglePrepositionFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prepositionFormatCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Preposition not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Temporary Exercise data
const createExercisePrepositionFormat = async (req, res) => {
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
    const result = await prepositionFormatExerciseCollection.insertOne(data);
    // ✅ Create TTL index if not exists (safe to run multiple times)
    await prepositionFormatExerciseCollection.createIndex(
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
// ✅ Get All Exercise Preposition
const getAllExercisePrepositionFormat = async (req, res) => {
  try {
    const result = await prepositionFormatExerciseCollection
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
// ✅ Delete Exercise Preposition
const deleteExercisePrepositionFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prepositionFormatExerciseCollection.deleteOne({
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

// ✅ Update Before Professional Field
const updateBeforeProfessionalFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    if (!fieldName) {
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      const doc = await beforeProfessionalFormatFieldsCollection.findOne({});
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: "No before professional field found",
        });
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

    const result = await beforeProfessionalFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No before professional field found to update",
      });
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
const getBeforeProfessionalFormatField = async (req, res) => {
  try {
    const result = await beforeProfessionalFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Before CURD
const createBeforeProfessionalFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await beforeProfessionalFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Before Professional created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllBeforeProfessionalFormat = async (req, res) => {
  try {
    const result = await beforeProfessionalFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleBeforeProfessionalFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await beforeProfessionalFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Before Professional not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateBeforeProfessionalFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await beforeProfessionalFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Before Professional not found" });
    }

    res.json({
      success: true,
      message: "Before Professional updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteBeforeProfessionalFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await beforeProfessionalFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Exercise Before Professional
const createExerciseBeforeProfessionalFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result =
      await beforeProfessionalFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await beforeProfessionalFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllExerciseBeforeProfessionalFormat = async (req, res) => {
  try {
    const result = await beforeProfessionalFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseBeforeProfessionalFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await beforeProfessionalFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Corporate Email Field
const updateCorporateEmailFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await corporateEmailFormatFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No corporate email field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await corporateEmailFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    if (result.matchedCount === 0)
      return res.status(404).json({
        success: false,
        message: "No corporate email field found to update",
      });

    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get Corporate Email Fields
const getCorporateEmailFormatField = async (req, res) => {
  try {
    const result = await corporateEmailFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Corporate Email
const createCorporateEmailFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await corporateEmailFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Corporate Email created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Get All Corporate Emails
const getAllCorporateEmailFormat = async (req, res) => {
  try {
    const result = await corporateEmailFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Corporate Email
const getSingleCorporateEmailFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await corporateEmailFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Corporate Email not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Update Corporate Email
const updateCorporateEmailFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await corporateEmailFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Corporate Email not found" });
    }

    res.json({
      success: true,
      message: "Corporate Email updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Corporate Email
const deleteCorporateEmailFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await corporateEmailFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Create Exercise Corporate Email (with userInfo)
const createExerciseCorporateEmailFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await corporateEmailFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await corporateEmailFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Get All Corporate Email Exercises
const getAllExerciseCorporateEmailFormat = async (req, res) => {
  try {
    const result = await corporateEmailFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Corporate Email Exercise
const deleteExerciseCorporateEmailFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await corporateEmailFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Develop Skills Field
const updateDevelopSkillsFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await developSkillsFormatFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No develop skills field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await developSkillsFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getDevelopSkillsFormatField = async (req, res) => {
  try {
    const result = await developSkillsFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Develop Skills CURD
const createDevelopSkillsFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await developSkillsFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Develop Skills created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteDevelopSkillsFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await developSkillsFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllDevelopSkillsFormat = async (req, res) => {
  try {
    const result = await developSkillsFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleDevelopSkillsFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await developSkillsFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Develop Skills not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateDevelopSkillsFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await developSkillsFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Develop Skills not found" });
    }

    res.json({
      success: true,
      message: "Develop Skills updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Develop Skills
const createExerciseDevelopSkillsFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await developSkillsFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await developSkillsFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllExerciseDevelopSkillsFormat = async (req, res) => {
  try {
    const result = await developSkillsFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseDevelopSkillsFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await developSkillsFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Good Life Style Field
const updateGoodLifeStyleFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodLifeStyleFormatFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good life style field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await goodLifeStyleFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getGoodLifeStyleFormatField = async (req, res) => {
  try {
    const result = await goodLifeStyleFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodLifeStyleFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodLifeStyleFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Life Style created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteGoodLifeStyleFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodLifeStyleFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGoodLifeStyleFormat = async (req, res) => {
  try {
    const result = await goodLifeStyleFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodLifeStyleFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodLifeStyleFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Good Life Style not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateGoodLifeStyleFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodLifeStyleFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Good Life Style not found" });
    }

    res.json({
      success: true,
      message: "Good Life Style updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Good Life Style
const createExerciseGoodLifeStyleFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result = await goodLifeStyleFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await goodLifeStyleFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllExerciseGoodLifeStyleFormat = async (req, res) => {
  try {
    const result = await goodLifeStyleFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodLifeStyleFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodLifeStyleFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Interview Questions Field
const updateInterviewQuestionsFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await interviewQuestionsFormatFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({
            success: false,
            message: "No interview questions field found",
          });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await interviewQuestionsFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getInterviewQuestionsFormatField = async (req, res) => {
  try {
    const result = await interviewQuestionsFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Interview Questions CURD
const createInterviewQuestionsFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await interviewQuestionsFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Interview Questions created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteInterviewQuestionsFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await interviewQuestionsFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllInterviewQuestionsFormat = async (req, res) => {
  try {
    const result = await interviewQuestionsFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleInterviewQuestionsFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await interviewQuestionsFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Interview Questions not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateInterviewQuestionsFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await interviewQuestionsFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Interview Questions not found" });
    }

    res.json({
      success: true,
      message: "Interview Questions updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Good Life Style
const createExerciseInterviewQuestionsFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      userInfo, // 👈 frontend theke আসবে
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    const result =
      await interviewQuestionsFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await interviewQuestionsFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllExerciseInterviewQuestionsFormat = async (req, res) => {
  try {
    const result = await interviewQuestionsFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseInterviewQuestionsFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await interviewQuestionsFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Good Life Style Field
const updateIdeaSharesFormatField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await ideaSharesFormatFieldsCollection.findOne({});
      if (!doc)
        return res
          .status(404)
          .json({ success: false, message: "No good life style field found" });
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value)
        return res
          .status(400)
          .json({ success: false, message: "value is required" });
      updateData[fieldName] = value;
    }

    const result = await ideaSharesFormatFieldsCollection.updateOne(
      {},
      { $set: updateData },
    );
    res.json({
      success: true,
      message: `${fieldName} updated successfully`,
      updatedValue: updateData[fieldName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getIdeaSharesFormatField = async (req, res) => {
  try {
    const result = await ideaSharesFormatFieldsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createIdeaSharesFormat = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await ideaSharesFormatCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Life Style created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteIdeaSharesFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ideaSharesFormatCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllIdeaSharesFormat = async (req, res) => {
  try {
    const result = await ideaSharesFormatCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleIdeaSharesFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ideaSharesFormatCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Idea Shares not found" });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateIdeaSharesFormat = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await ideaSharesFormatCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Idea Shares not found" });
    }

    res.json({
      success: true,
      message: "Idea Shares updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Develop Skills
const createExerciseIdeaSharesFormat = async (req, res) => {
  try {
    const {
      name,
      description,
      link, // optional
      ideaShareImage, // optional
      userInfo,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    if (!userInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "User info is required",
      });
    }

    // Base data (required fields)
    const data = {
      name,
      description,
      userInfo: {
        userId: userInfo.userId,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role || "student",
      },
      createdAt: new Date(),
    };

    // Optional fields (only add if provided)
    if (link && link.trim() !== "") {
      data.link = link.trim();
    }

    if (ideaShareImage && ideaShareImage.trim() !== "") {
      data.ideaShareImage = ideaShareImage.trim();
    }

    const result = await ideaSharesFormatExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await ideaSharesFormatExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 },
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created successfully (auto-delete in 30 days)",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const getAllExerciseIdeaSharesFormat = async (req, res) => {
  try {
    const result = await ideaSharesFormatExerciseCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseIdeaSharesFormat = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ideaSharesFormatExerciseCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Exercise not found" });
    }

    res.json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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
  createSentenceFormat,
  getAllSentenceFormat,
  deleteSentenceFormat,
  updateSentenceFormatField,
  getSentenceFormatField,
  createExerciseSentenceFormat,
  createVerbFormat,
  getAllVerbFormat,
  deleteVerbFormat,
  updateVerbFormatField,
  getVerbFormatField,
  createExerciseVerbFormat,
  createArticleFormat,
  getAllArticleFormat,
  deleteArticleFormat,
  updateArticleFormatField,
  getArticleFormatField,
  createExerciseArticleFormat,
  createTenseFormat,
  getAllTenseFormat,
  deleteTenseFormat,
  updateTenseFormatField,
  getTenseFormatField,
  createExerciseTenseFormat,
  createPrepositionFormat,
  getAllPrepositionFormat,
  deletePrepositionFormat,
  updatePrepositionFormatField,
  getPrepositionFormatField,
  createExercisePrepositionFormat,
  updateSentenceFormat,
  getSingleSentenceFormat,
  updateVerbFormat,
  getSingleVerbFormat,
  updateArticleFormat,
  getSingleArticleFormat,
  updateTenseFormat,
  getSingleTenseFormat,
  updatePrepositionFormat,
  getSinglePrepositionFormat,
  getAllExerciseSentenceFormat,
  deleteExerciseSentenceFormat,
  getAllExerciseVerbFormat,
  deleteExerciseVerbFormat,
  getAllExerciseArticleFormat,
  deleteExerciseArticleFormat,
  getAllExerciseTenseFormat,
  deleteExerciseTenseFormat,
  getAllExercisePrepositionFormat,
  deleteExercisePrepositionFormat,
  // Third Layer Format
  updateBeforeProfessionalFormatField,
  getBeforeProfessionalFormatField,
  createBeforeProfessionalFormat,
  getAllBeforeProfessionalFormat,
  getSingleBeforeProfessionalFormat,
  updateBeforeProfessionalFormat,
  deleteBeforeProfessionalFormat,
  createExerciseBeforeProfessionalFormat,
  getAllExerciseBeforeProfessionalFormat,
  deleteExerciseBeforeProfessionalFormat,
  updateCorporateEmailFormatField,
  getCorporateEmailFormatField,
  createCorporateEmailFormat, 
  getAllCorporateEmailFormat,
  getSingleCorporateEmailFormat,
  updateCorporateEmailFormat,
  deleteCorporateEmailFormat,
  createExerciseCorporateEmailFormat,
  getAllExerciseCorporateEmailFormat,
  deleteExerciseCorporateEmailFormat,
  updateDevelopSkillsFormatField,
  getDevelopSkillsFormatField,
  createDevelopSkillsFormat,
  getAllDevelopSkillsFormat,
  getSingleDevelopSkillsFormat,
  updateDevelopSkillsFormat,
  deleteDevelopSkillsFormat,
  createExerciseDevelopSkillsFormat,
  getAllExerciseDevelopSkillsFormat,
  deleteExerciseDevelopSkillsFormat,
  updateGoodLifeStyleFormatField,
  getGoodLifeStyleFormatField,
  createGoodLifeStyleFormat,
  getAllGoodLifeStyleFormat,
  getSingleGoodLifeStyleFormat,
  updateGoodLifeStyleFormat,
  deleteGoodLifeStyleFormat,
  createExerciseGoodLifeStyleFormat,
  getAllExerciseGoodLifeStyleFormat,
  deleteExerciseGoodLifeStyleFormat,
  updateInterviewQuestionsFormatField,
  getInterviewQuestionsFormatField,
  createInterviewQuestionsFormat,
  getAllInterviewQuestionsFormat,
  getSingleInterviewQuestionsFormat,
  updateInterviewQuestionsFormat,
  deleteInterviewQuestionsFormat,
  createExerciseInterviewQuestionsFormat,
  getAllExerciseInterviewQuestionsFormat,
  deleteExerciseInterviewQuestionsFormat,
  updateIdeaSharesFormatField,
  getIdeaSharesFormatField,
  createIdeaSharesFormat,
  getAllIdeaSharesFormat,
  getSingleIdeaSharesFormat,
  updateIdeaSharesFormat,
  deleteIdeaSharesFormat,
  createExerciseIdeaSharesFormat,
  getAllExerciseIdeaSharesFormat,
  deleteExerciseIdeaSharesFormat,
  
};
