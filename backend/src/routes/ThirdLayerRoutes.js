// const express = require("express");
// const {
//   updateGoodLifeStyleField,
//   getAllGoodLifeStyles,
//   getGoodLifeStyleField,
//   createExerciseGoodLifeStyle,
//   deleteGoodLifeStyle,
//   createGoodLifeStyle,
//   allbeforeProfessionalField,
//   updateBeforeProfesinalField,
//   createExerciseBeforeProfessional,
//   getAllBeforeProfessional,
//   createBeforeProfessional,
//   deleteBeforeProfessional,
// } = require("../Controllers/ThirdLayerController");

// const router = express.Router();

// // Good Song field
// router.put("/goodLifeStyleField/:id", updateGoodLifeStyleField);
// router.get("/goodLifeStyleField", getGoodLifeStyleField);
// router.post("/createExercisegoodLifeStyleField", createExerciseGoodLifeStyle);
// // Good Song
// router.delete("/goodLifeStyle/:id", deleteGoodLifeStyle);
// router.get("/goodLifeStyle", getAllGoodLifeStyles);
// router.post("/goodLifeStyle", createGoodLifeStyle);

// //  Before Professional Field Routes
// router.get("/beforeProfessionalField", allbeforeProfessionalField);
// router.put("/beforeProfessionalField/:id", updateBeforeProfesinalField);

// //Before Professional Exercise Routes
// router.post(
//   "/createExerciseBeforeProfessional",
//   createExerciseBeforeProfessional
// );

// //  Before Professional Main Routes
// router.get("/beforeProfessional", getAllBeforeProfessional);
// router.post("/beforeProfessional", createBeforeProfessional);
// router.delete("/beforeProfessional/:id", deleteBeforeProfessional);

// module.exports = router;
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

/* --------------------------------------------------------------------------
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

module.exports = router;
