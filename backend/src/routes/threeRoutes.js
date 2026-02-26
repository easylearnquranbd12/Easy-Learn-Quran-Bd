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
  updateCorporateEmail,
  getSingleCorporateEmail,
  getAllExerciseCorporateEmail,
  deleteExerciseCorporateEmail,
  getSingleGoodLifeStyle,
  updateGoodLifeStyle,
  getSingleBeforeProfessional,
  updateBeforeProfessional,
  deleteExerciseBeforeProfessional,
  getAllExerciseBeforeProfessional,
  deleteExerciseGoodLifeStyle,
  getAllExerciseGoodLifeStyle,
  getSingleDevelopSkills,
  updateDevelopSkills,
  getAllExerciseDevelopSkills,
  deleteExerciseDevelopSkills,
  getSingleIdeaShares,
  updateIdeaShares,
  getAllExerciseIdeaShares,
  deleteExerciseIdeaShares,
  updateInterviewQuestionsField,
  getInterviewQuestionsField,
  createInterviewQuestions,
  getAllInterviewQuestions,
  deleteInterviewQuestions,
  getSingleInterviewQuestions,
  updateInterviewQuestions,
  createExerciseInterviewQuestions,
  deleteExerciseInterviewQuestions,
  getAllExerciseInterviewQuestions,
} = require("../controllers/threeLayerController");

const router = express.Router();

/* --------------------------------------------------------------------------
 ✅ GOOD LIFE STYLE ROUTES
-------------------------------------------------------------------------- */
// Good life style field
router.put("/goodLifeStyleField/:id", updateGoodLifeStyleField);
router.get("/goodLifeStyleField", getGoodLifeStyleField);
// Good Life style CRUD
router.post("/goodLifeStyle", createGoodLifeStyle);
router.get("/goodLifeStyle", getAllGoodLifeStyle);
router.delete("/goodLifeStyle/:id", deleteGoodLifeStyle);
router.get("/goodLifeStyle/:id", getSingleGoodLifeStyle);
router.put("/goodLifeStyle/:id", updateGoodLifeStyle);
// Good life style exercise
router.post("/createExerciseGoodLifeStyle", createExerciseGoodLifeStyle);
router.delete("/deleteExerciseGoodLifeStyle/:id", deleteExerciseGoodLifeStyle);
router.get("/getAllExerciseGoodLifeStyle", getAllExerciseGoodLifeStyle);
/* --------------------------------------------------------------------------
 ✅ Interview Questions ROUTES
-------------------------------------------------------------------------- */
// Interview Questions field
router.put("/interviewQuestionsField/:id", updateInterviewQuestionsField);
router.get("/interviewQuestionsField", getInterviewQuestionsField);
// Interview Questions CRUD
router.post("/interviewQuestions", createInterviewQuestions);
router.get("/interviewQuestions", getAllInterviewQuestions);
router.delete("/interviewQuestions/:id", deleteInterviewQuestions);
router.get("/interviewQuestions/:id", getSingleInterviewQuestions);
router.put("/interviewQuestions/:id", updateInterviewQuestions);
// Interview Questions exercise
router.post("/createExerciseInterviewQuestions", createExerciseInterviewQuestions);
router.delete("/deleteExerciseInterviewQuestions/:id", deleteExerciseInterviewQuestions);
router.get("/getAllExerciseInterviewQuestions", getAllExerciseInterviewQuestions);

/* ---------------------------------------------------------------------oks-----
 ✅ BEFORE PROFESSIONAL ROUTES
-------------------------------------------------------------------------- */
// Before professional field
router.put("/beforeProfessionalField/:id", updateBeforeProfessionalField);
router.get("/beforeProfessionalField", getBeforeProfessionalField);
// Before professional CRUD
router.get("/beforeProfessional", getAllBeforeProfessional);
router.post("/beforeProfessional", createBeforeProfessional);
router.get("/beforeProfessional/:id", getSingleBeforeProfessional);
router.put("/beforeProfessional/:id", updateBeforeProfessional);
router.delete("/beforeProfessional/:id", deleteBeforeProfessional);
// Before professional exercise
router.post(
  "/createExerciseBeforeProfessional",
  createExerciseBeforeProfessional,
);
router.delete(
  "/deleteExerciseBeforeProfessional/:id",
  deleteExerciseBeforeProfessional,
);
router.get(
  "/getAllExerciseBeforeProfessional",
  getAllExerciseBeforeProfessional,
);

/* --------------------------------------------------------------------------
 ✅ CORPORATE EMAIL ROUTES
-------------------------------------------------------------------------- */
// Corporate email field
router.put("/corporateEmailField/:id", updateCorporateEmailField);
router.get("/corporateEmailField", getCorporateEmailField);
// Corporate email CRUD
router.post("/corporateEmail", createCorporateEmail);
router.get("/corporateEmail", getAllCorporateEmail);
router.put("/corporateEmail/:id", updateCorporateEmail);
router.get("/corporateEmail/:id", getSingleCorporateEmail);
router.delete("/corporateEmail/:id", deleteCorporateEmail);
// corporate email exercise
router.post("/createExerciseCorporateEmail", createExerciseCorporateEmail);
router.get("/getAllExerciseCorporateEmail", getAllExerciseCorporateEmail);
router.delete(
  "/deleteExerciseCorporateEmail/:id",
  deleteExerciseCorporateEmail,
);

/* --------------------------------------------------------------------------
 ✅ DEVELOP YOUR SKILLS ROUTES
-------------------------------------------------------------------------- */
// Develop your skills field
router.put("/developSkillsField/:id", updateDevelopSkillsField);
router.get("/developSkillsField", getDevelopSkillsField);
// Develop your skills CRUD
router.post("/developSkills", createDevelopSkills);
router.get("/developSkills", getAllDevelopSkills);
router.delete("/developSkills/:id", deleteDevelopSkills);
router.get("/developSkills/:id", getSingleDevelopSkills);
router.put("/developSkills/:id", updateDevelopSkills);
// Develop your skills exercise
router.post("/createExerciseDevelopSkills", createExerciseDevelopSkills);
router.get("/getAllExerciseDevelopSkills", getAllExerciseDevelopSkills);
router.delete("/deleteExerciseDevelopSkills/:id", deleteExerciseDevelopSkills);
/* --------------------------------------------------------------------------
 ✅ IDEA SHARE ROUTES
-------------------------------------------------------------------------- */
// Idea share field
router.put("/ideaSharesField/:id", updateIdeaSharesField);
router.get("/ideaSharesField", getIdeaSharesField);
// Idea share CRUD
router.post("/ideaShares", createIdeaShares);
router.get("/ideaShares", getAllIdeaShares);
router.delete("/ideaShares/:id", deleteIdeaShares);
router.get("/ideaShares/:id", getSingleIdeaShares);
router.put("/ideaShares/:id", updateIdeaShares);
// Idea Share exercise
router.post("/createExerciseIdeaShares", createExerciseIdeaShares);
router.get("/getAllExerciseIdeaShares", getAllExerciseIdeaShares);
router.delete("/deleteExerciseIdeaShares/:id", deleteExerciseIdeaShares);

module.exports = router;
