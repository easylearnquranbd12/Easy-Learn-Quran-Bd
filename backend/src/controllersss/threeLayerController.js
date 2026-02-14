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
  // Idea Shares
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

    const result = await beforeProfessionalFieldsCollection.updateOne(
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
const getBeforeProfessionalField = async (req, res) => {
  try {
    const result = await beforeProfessionalFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Before CURD
const createBeforeProfessional = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await beforeProfessionalCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Before Professional created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllBeforeProfessional = async (req, res) => {
  try {
    const result = await beforeProfessionalCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleBeforeProfessional = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await beforeProfessionalCollection.findOne({
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
const updateBeforeProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await beforeProfessionalCollection.updateOne(
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

// ✅ Create Exercise Before Professional
const createExerciseBeforeProfessional = async (req, res) => {
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

    const result = await beforeProfessionalExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await beforeProfessionalExerciseCollection.createIndex(
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
const getAllExerciseBeforeProfessional = async (req, res) => {
  try {
    const result = await beforeProfessionalExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseBeforeProfessional = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await beforeProfessionalExerciseCollection.deleteOne({
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
const getCorporateEmailField = async (req, res) => {
  try {
    const result = await corporateEmailFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Create Corporate Email
const createCorporateEmail = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await corporateEmailCollection.insertOne(data);
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
const getAllCorporateEmail = async (req, res) => {
  try {
    const result = await corporateEmailCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get Single Corporate Email
const getSingleCorporateEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await corporateEmailCollection.findOne({
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
const updateCorporateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await corporateEmailCollection.updateOne(
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
// ✅ Create Exercise Corporate Email (with userInfo)
const createExerciseCorporateEmail = async (req, res) => {
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

    const result = await corporateEmailExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await corporateEmailExerciseCollection.createIndex(
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
const getAllExerciseCorporateEmail = async (req, res) => {
  try {
    const result = await corporateEmailExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ✅ Delete Corporate Email Exercise
const deleteExerciseCorporateEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await corporateEmailExerciseCollection.deleteOne({
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
const getDevelopSkillsField = async (req, res) => {
  try {
    const result = await developSkillsFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Exercise Develop Skills CURD
const createDevelopSkills = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await developSkillsCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Develop Skills created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
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
const getAllDevelopSkills = async (req, res) => {
  try {
    const result = await developSkillsCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleDevelopSkills = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await developSkillsCollection.findOne({
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
const updateDevelopSkills = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await developSkillsCollection.updateOne(
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
const createExerciseDevelopSkills = async (req, res) => {
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

    const result = await developSkillsExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await developSkillsExerciseCollection.createIndex(
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
const getAllExerciseDevelopSkills = async (req, res) => {
  try {
    const result = await developSkillsExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseDevelopSkills = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await developSkillsExerciseCollection.deleteOne({
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
const getGoodLifeStyleField = async (req, res) => {
  try {
    const result = await goodLifeStyleFieldsCollection.find().sort({ createdAt: -1 }).toArray();

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createGoodLifeStyle = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await goodLifeStyleCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Life Style created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
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
const getAllGoodLifeStyle = async (req, res) => {
  try {
    const result = await goodLifeStyleCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGoodLifeStyle = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodLifeStyleCollection.findOne({
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
const updateGoodLifeStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await goodLifeStyleCollection.updateOne(
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
const createExerciseGoodLifeStyle = async (req, res) => {
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

    const result = await goodLifeStyleExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days
    await goodLifeStyleExerciseCollection.createIndex(
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
const getAllExerciseGoodLifeStyle = async (req, res) => {
  try {
    const result = await goodLifeStyleExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseGoodLifeStyle = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await goodLifeStyleExerciseCollection.deleteOne({
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
const getIdeaSharesField = async (req, res) => {
  try {
    const result = await ideaSharesFieldsCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create Good Life Style CURD
const createIdeaShares = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date().toISOString() };
    const result = await ideaSharesCollection.insertOne(data);
    res.status(201).json({
      success: true,
      message: "Good Life Style created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
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
const getAllIdeaShares = async (req, res) => {
  try {
    const result = await ideaSharesCollection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleIdeaShares = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ideaSharesCollection.findOne({
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
const updateIdeaShares = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await ideaSharesCollection.updateOne(
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
const createExerciseIdeaShares = async (req, res) => {
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

    const result = await ideaSharesExerciseCollection.insertOne(data);

    // ⏱ Auto delete after 30 days (create index once in app init ideally)
    await ideaSharesExerciseCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60 }
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

const getAllExerciseIdeaShares = async (req, res) => {
  try {
    const result = await ideaSharesExerciseCollection.find().sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteExerciseIdeaShares = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ideaSharesExerciseCollection.deleteOne({
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
  getSingleBeforeProfessional,
  updateBeforeProfessional,
  getAllExerciseBeforeProfessional,
  deleteExerciseBeforeProfessional,

  // Corporate Email
  updateCorporateEmailField,
  getCorporateEmailField,
  createExerciseCorporateEmail,
  createCorporateEmail,
  deleteCorporateEmail,
  getAllCorporateEmail,
  getSingleCorporateEmail,
  updateCorporateEmail,
  getAllExerciseCorporateEmail,
  deleteExerciseCorporateEmail,

  // Develop Your Skills
  updateDevelopSkillsField,
  getDevelopSkillsField,
  createExerciseDevelopSkills,
  createDevelopSkills,
  deleteDevelopSkills,
  getAllDevelopSkills,
  getSingleDevelopSkills,
  updateDevelopSkills,
  getAllExerciseDevelopSkills,
  deleteExerciseDevelopSkills,

  // Good Life Style
  updateGoodLifeStyleField,
  getGoodLifeStyleField,
  createExerciseGoodLifeStyle,
  createGoodLifeStyle,
  deleteGoodLifeStyle,
  getAllGoodLifeStyle,
  getSingleGoodLifeStyle,
  updateGoodLifeStyle,
  getAllExerciseGoodLifeStyle,
  deleteExerciseGoodLifeStyle,

  // Idea Share
  updateIdeaSharesField,
  getIdeaSharesField,
  createExerciseIdeaShares,
  createIdeaShares,
  deleteIdeaShares,
  getAllIdeaShares,
  getSingleIdeaShares,
  getAllExerciseIdeaShares,
  deleteExerciseIdeaShares,
  updateIdeaShares,
};
