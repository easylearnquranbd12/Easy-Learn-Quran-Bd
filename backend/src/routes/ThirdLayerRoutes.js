
const express = require("express");
const {
  // ✅ Good Life Style
  updateGoodLifeStyleField,
  getAllGoodLifeStyle,
  getGoodLifeStyleField,
  createExerciseGoodLifeStyle,
  deleteGoodLifeStyle,
  createGoodLifeStyle,

  // ✅ Before Professional
  getBeforeProfessionalField,
  updateBeforeProfessionalField,
  createExerciseBeforeProfessional,
  getAllBeforeProfessional,
  createBeforeProfessional,
  deleteBeforeProfessional,

  // ✅ Corporate Email
  updateCorporateEmailField,
  getCorporateEmailField,
  createExerciseCorporateEmail,
  getAllCorporateEmail,
  createCorporateEmail,
  deleteCorporateEmail,

  // ✅ Develop Your Skills
  updateDevelopSkillsField,
  getDevelopSkillsField,
  createExerciseDevelopSkills,
  getAllDevelopSkills,
  createDevelopSkills,
  deleteDevelopSkills,
  updateIdeaSharesField,
  getIdeaSharesField,
  getAllIdeaShares,
  createIdeaShares,
  deleteIdeaShares,
  createExerciseIdeaShares,
} = require("../Controllers/thirdLayerController");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ GOOD LIFE STYLE ROUTES
-------------------------------------------------------------------------- */
router.put("/goodLifeStyleField/:id", updateGoodLifeStyleField);
router.get("/goodLifeStyleField", getGoodLifeStyleField);
router.post("/createExerciseGoodLifeStyleField", createExerciseGoodLifeStyle);
router.delete("/goodLifeStyle/:id", deleteGoodLifeStyle);
router.get("/goodLifeStyle", getAllGoodLifeStyle);
router.post("/goodLifeStyle", createGoodLifeStyle);

/* ---------------------------------------------------------------------oks-----
 ✅ BEFORE PROFESSIONAL ROUTES
-------------------------------------------------------------------------- */
router.put("/beforeProfessionalField/:id", updateBeforeProfessionalField);
router.get("/beforeProfessionalField", getBeforeProfessionalField);
router.post("/createExerciseBeforeProfessional", createExerciseBeforeProfessional);
router.delete("/beforeProfessional/:id", deleteBeforeProfessional);
router.get("/beforeProfessional", getAllBeforeProfessional);
router.post("/beforeProfessional", createBeforeProfessional);

/* --------------------------------------------------------------------------
 ✅ CORPORATE EMAIL ROUTES
-------------------------------------------------------------------------- */
router.put("/corporateEmailField/:id", updateCorporateEmailField);
router.get("/corporateEmailField", getCorporateEmailField);
router.post("/createExerciseCorporateEmail", createExerciseCorporateEmail);
router.delete("/corporateEmail/:id", deleteCorporateEmail);
router.get("/corporateEmail", getAllCorporateEmail);
router.post("/corporateEmail", createCorporateEmail);

/* --------------------------------------------------------------------------
 ✅ DEVELOP YOUR SKILLS ROUTES
-------------------------------------------------------------------------- */
router.put("/developSkillsField/:id", updateDevelopSkillsField);
router.get("/developSkillsField", getDevelopSkillsField);
router.post("/createExerciseDevelopSkills", createExerciseDevelopSkills);
router.delete("/developSkills/:id", deleteDevelopSkills);
router.get("/developSkills", getAllDevelopSkills);
router.post("/developSkills", createDevelopSkills);
/* --------------------------------------------------------------------------
 ✅ IDEA SHARE ROUTES
-------------------------------------------------------------------------- */
router.put("/ideaSharesField/:id", updateIdeaSharesField);
router.get("/ideaSharesField", getIdeaSharesField);
router.post("/createExerciseideaShares", createExerciseIdeaShares);
router.delete("/ideaShares/:id", deleteIdeaShares);
router.get("/ideaShares", getAllIdeaShares);
router.post("/ideaShares", createIdeaShares);

module.exports = router;
