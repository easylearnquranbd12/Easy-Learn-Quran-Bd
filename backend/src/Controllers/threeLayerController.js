const { ObjectId } = require("mongodb");
const {
  // Before Professional
  getThirdLayerBeforeProfessionalFieldsCollection,
  getThirdLayerBeforeProfessionalCollection,
  getThirdLayerBeforeProfessionalExerciseCollection,

  // Corporate Email
  getThirdLayerCorporateEmailFieldsCollection,
  getThirdLayerCorporateEmailCollection,
  getThirdLayerCorporateEmailExerciseCollection,

  // Develop Your Skills
  getThirdLayerDevelopSkillsFieldsCollection,
  getThirdLayerDevelopSkillsCollection,
  getThirdLayerDevelopSkillsExerciseCollection,

  // Good Life Style
  getThirdLayerGoodLifeStyleFieldsCollection,
  getThirdLayerGoodLifeStyleCollection,
  getThirdLayerGoodLifeStyleExerciseCollection,
  getThirdLayerIdeaSharesFieldsCollection,
  getThirdLayerIdeaSharesCollection,
  getThirdLayerIdeaSharesExerciseCollection,
} = require("../config/db");

// -----------------------------------------------------------------------------
// Before Professional
// -----------------------------------------------------------------------------
const beforeProfessionalFieldsCollection =
  getThirdLayerBeforeProfessionalFieldsCollection();
const beforeProfessionalCollection =
  getThirdLayerBeforeProfessionalCollection();
const beforeProfessionalExerciseCollection =
  getThirdLayerBeforeProfessionalExerciseCollection();

// ✅ Update Before Professional Field
const updateBeforeProfessionalField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    if (!fieldName) {
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });
    }

    let updateData = {};

    if (fieldName === "isActive") {
      const doc = await beforeProfessionalFieldsCollection.findOne({});
      if (!doc) {
        return res
          .status(404)
          .json({
            success: false,
            message: "No before professional field found",
          });
      }
      updateData[fieldName] = doc.isActive === "ON" ? "OFF" : "ON";
    } else {
      if (!value) {
        return res
          .status(400)
          .json({
            success: false,
            message: "value is required for this field",
          });
      }
      updateData[fieldName] = value;
    }

    const result = await beforeProfessionalFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({
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

// ✅ Get Before Professional Fields
const getBeforeProfessionalField = async (req, res) => {
  try {
    const result = await beforeProfessionalFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Before Professional
const createExerciseBeforeProfessional = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await beforeProfessionalExerciseCollection.insertOne(data);
    await beforeProfessionalExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );

    res.status(201).json({
      success: true,
      id: result.insertedId,
      message: "Exercise created. It will auto-delete after 30 days.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Before Professional
const createBeforeProfessional = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await beforeProfessionalCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Before Professional created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Before Professional
const deleteBeforeProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await beforeProfessionalCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Before Professionals
const getAllBeforeProfessional = async (req, res) => {
  try {
    const result = await beforeProfessionalCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Corporate Email
// -----------------------------------------------------------------------------
const corporateEmailFieldsCollection =
  getThirdLayerCorporateEmailFieldsCollection();
const corporateEmailCollection = getThirdLayerCorporateEmailCollection();
const corporateEmailExerciseCollection =
  getThirdLayerCorporateEmailExerciseCollection();

// ✅ Update Corporate Email Field
const updateCorporateEmailField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await corporateEmailFieldsCollection.findOne({});
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

    const result = await corporateEmailFieldsCollection.updateOne(
      {},
      { $set: updateData }
    );
    if (result.matchedCount === 0)
      return res
        .status(404)
        .json({
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
const getCorporateEmailField = async (req, res) => {
  try {
    const result = await corporateEmailFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Corporate Email
const createExerciseCorporateEmail = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await corporateEmailExerciseCollection.insertOne(data);
    await corporateEmailExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Corporate Email
const createCorporateEmail = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await corporateEmailCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Corporate Email created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Corporate Email
const deleteCorporateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await corporateEmailCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Corporate Emails
const getAllCorporateEmail = async (req, res) => {
  try {
    const result = await corporateEmailCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Develop Your Skills
// -----------------------------------------------------------------------------
const developSkillsFieldsCollection =
  getThirdLayerDevelopSkillsFieldsCollection();
const developSkillsCollection = getThirdLayerDevelopSkillsCollection();
const developSkillsExerciseCollection =
  getThirdLayerDevelopSkillsExerciseCollection();

// ✅ Update Develop Skills Field
const updateDevelopSkillsField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await developSkillsFieldsCollection.findOne({});
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

    const result = await developSkillsFieldsCollection.updateOne(
      {},
      { $set: updateData }
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

// ✅ Get Develop Skills Fields
const getDevelopSkillsField = async (req, res) => {
  try {
    const result = await developSkillsFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Develop Skills
const createExerciseDevelopSkills = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await developSkillsExerciseCollection.insertOne(data);
    await developSkillsExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Develop Skills
const createDevelopSkills = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await developSkillsCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Develop Skills created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Develop Skills
const deleteDevelopSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await developSkillsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Develop Skills
const getAllDevelopSkills = async (req, res) => {
  try {
    const result = await developSkillsCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// Good Life Style
// -----------------------------------------------------------------------------
const goodLifeStyleFieldsCollection =
  getThirdLayerGoodLifeStyleFieldsCollection();
const goodLifeStyleCollection = getThirdLayerGoodLifeStyleCollection();
const goodLifeStyleExerciseCollection =
  getThirdLayerGoodLifeStyleExerciseCollection();

// ✅ Update Good Life Style Field
const updateGoodLifeStyleField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await goodLifeStyleFieldsCollection.findOne({});
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

    const result = await goodLifeStyleFieldsCollection.updateOne(
      {},
      { $set: updateData }
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

// ✅ Get Good Life Style Fields
const getGoodLifeStyleField = async (req, res) => {
  try {
    const result = await goodLifeStyleFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Good Life Style
const createExerciseGoodLifeStyle = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await goodLifeStyleExerciseCollection.insertOne(data);
    await goodLifeStyleExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style
const createGoodLifeStyle = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodLifeStyleCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Good Life Style created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Good Life Style
const deleteGoodLifeStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await goodLifeStyleCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Good Life Styles
const getAllGoodLifeStyle = async (req, res) => {
  try {
    const result = await goodLifeStyleCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// idea Share
// -----------------------------------------------------------------------------
const ideaSharesFieldsCollection = getThirdLayerIdeaSharesFieldsCollection();
const ideaSharesCollection = getThirdLayerIdeaSharesCollection();
const ideaSharesExerciseCollection =
  getThirdLayerIdeaSharesExerciseCollection();

// ✅ Update Good Life Style Field
const updateIdeaSharesField = async (req, res) => {
  try {
    const { fieldName, value } = req.body;
    if (!fieldName)
      return res
        .status(400)
        .json({ success: false, message: "fieldName is required" });

    let updateData = {};
    if (fieldName === "isActive") {
      const doc = await ideaSharesFieldsCollection.findOne({});
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

    const result = await ideaSharesFieldsCollection.updateOne(
      {},
      { $set: updateData }
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

// ✅ Get Good Life Style Fields
const getIdeaSharesField = async (req, res) => {
  try {
    const result = await ideaSharesFieldsCollection.find().toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Good Life Style
const createExerciseIdeaShares = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date() };
    const result = await ideaSharesExerciseCollection.insertOne(data);
    await ideaSharesExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
    );
    res
      .status(201)
      .json({
        success: true,
        id: result.insertedId,
        message: "Exercise created. Auto-delete after 30 days.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style
const createIdeaShares = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await ideaSharesCollection.insertOne(data);
    res
      .status(201)
      .json({
        success: true,
        message: "Good Life Style created successfully",
        data: result,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Good Life Style
const deleteIdeaShares = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ideaSharesCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Good Life Styles
const getAllIdeaShares = async (req, res) => {
  try {
    const result = await ideaSharesCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------
module.exports = {
  // Before Professional
  updateBeforeProfessionalField,
  getBeforeProfessionalField,
  createExerciseBeforeProfessional,
  createBeforeProfessional,
  deleteBeforeProfessional,
  getAllBeforeProfessional,

  // Corporate Email
  updateCorporateEmailField,
  getCorporateEmailField,
  createExerciseCorporateEmail,
  createCorporateEmail,
  deleteCorporateEmail,
  getAllCorporateEmail,

  // Develop Your Skills
  updateDevelopSkillsField,
  getDevelopSkillsField,
  createExerciseDevelopSkills,
  createDevelopSkills,
  deleteDevelopSkills,
  getAllDevelopSkills,

  // Good Life Style
  updateGoodLifeStyleField,
  getGoodLifeStyleField,
  createExerciseGoodLifeStyle,
  createGoodLifeStyle,
  deleteGoodLifeStyle,
  getAllGoodLifeStyle,

  // Idea Share
  updateIdeaSharesField,
  getIdeaSharesField,
  createExerciseIdeaShares,
  createIdeaShares,
  deleteIdeaShares,
  getAllIdeaShares,
};
