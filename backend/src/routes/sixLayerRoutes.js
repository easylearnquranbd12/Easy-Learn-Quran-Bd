const express = require("express");
const {
  getAllIdiomFormat,
  createIdiomFormat,
  deleteIdiomFormat,
  getSingleIdiomFormat,
  updateIdiomFormat,
  updateIdiomFormatField,
  getIdiomFormatField,
  createExerciseIdiomFormat,
  getAllExerciseIdiomFormat,
  deleteExerciseIdiomFormat,
  getAllVocabularyFormat,
  createVocabularyFormat,
  deleteVocabularyFormat,
  getSingleVocabularyFormat,
  updateVocabularyFormat,
  updateVocabularyFormatField,
  getVocabularyFormatField,
  createExerciseVocabularyFormat,
  getAllExerciseVocabularyFormat,
  getAllElegantFormat,
  createElegantFormat,
  deleteElegantFormat,
  getSingleElegantFormat,
  updateElegantFormat,
  updateElegantFormatField,
  getElegantFormatField,
  createExerciseElegantFormat,
  getAllExerciseElegantFormat,
  deleteExerciseElegantFormat,
  getAllTantusterFormat,
  createTantusterFormat,
  deleteTantusterFormat,
  getSingleTantusterFormat,
  updateTantusterFormat,
  updateTantusterFormatField,
  getTantusterFormatField,
  createExerciseTantusterFormat,
  getAllExerciseTantusterFormat,
  deleteExerciseTantusterFormat,
  getAllNewTantusterFormat,
  createNewTantusterFormat,
  deleteNewTantusterFormat,
  getSingleNewTantusterFormat,
  updateNewTantusterFormat,
  createExerciseNewTantusterFormat,
  getAllExerciseNewTantusterFormat,
  deleteExerciseNewTantusterFormat,
  deleteExerciseVocabularyFormat,
  updateNewTantusterFormatField,
  getNewTantusterFormatField,
  getAllSentenceFormat,
  createSentenceFormat,
  deleteSentenceFormat,
  getSingleSentenceFormat,
  updateSentenceFormat,
  updateSentenceFormatField,
  getSentenceFormatField,
  createExerciseSentenceFormat,
  getAllExerciseSentenceFormat,
  deleteExerciseSentenceFormat,
  getAllVerbFormat,
  createVerbFormat,
  deleteVerbFormat,
  getSingleVerbFormat,
  updateVerbFormat,
  updateVerbFormatField,
  getVerbFormatField,
  createExerciseVerbFormat,
  getAllExerciseVerbFormat,
  deleteExerciseVerbFormat,
  getAllTenseFormat,
  createTenseFormat,
  deleteTenseFormat,
  getSingleTenseFormat,
  updateTenseFormat,
  updateTenseFormatField,
  getTenseFormatField,
  createExerciseTenseFormat,
  getAllExerciseTenseFormat,
  deleteExerciseTenseFormat,
  getAllArticleFormat,
  createArticleFormat,
  deleteArticleFormat,
  getSingleArticleFormat,
  updateArticleFormat,
  updateArticleFormatField,
  getArticleFormatField,
  createExerciseArticleFormat,
  getAllExerciseArticleFormat,
  deleteExerciseArticleFormat,
  getAllPrepositionFormat,
  createPrepositionFormat,
  deletePrepositionFormat,
  getSinglePrepositionFormat,
  updatePrepositionFormat,
  updatePrepositionFormatField,
  getPrepositionFormatField,
  createExercisePrepositionFormat,
  getAllExercisePrepositionFormat,
  deleteExercisePrepositionFormat,
  updateGoodLifeStyleFormatField,
  getGoodLifeStyleFormatField,
  createGoodLifeStyleFormat,
  getAllGoodLifeStyleFormat,
  deleteGoodLifeStyleFormat,
  getSingleGoodLifeStyleFormat,
  updateGoodLifeStyleFormat,
  createExerciseGoodLifeStyleFormat,
  deleteExerciseGoodLifeStyleFormat,
  getAllExerciseGoodLifeStyleFormat,
  updateInterviewQuestionsFormatField,
  getInterviewQuestionsFormatField,
  createInterviewQuestionsFormat,
  getAllInterviewQuestionsFormat,
  deleteInterviewQuestionsFormat,
  getSingleInterviewQuestionsFormat,
  updateInterviewQuestionsFormat,
  createExerciseInterviewQuestionsFormat,
  deleteExerciseInterviewQuestionsFormat,
  getAllExerciseInterviewQuestionsFormat,
  updateBeforeProfessionalFormatField,
  getBeforeProfessionalFormatField,
  getAllBeforeProfessionalFormat,
  createBeforeProfessionalFormat,
  getSingleBeforeProfessionalFormat,
  updateBeforeProfessionalFormat,
  deleteBeforeProfessionalFormat,
  createExerciseBeforeProfessionalFormat,
  deleteExerciseBeforeProfessionalFormat,
  getAllExerciseBeforeProfessionalFormat,
  updateCorporateEmailFormatField,
  getCorporateEmailFormatField,
  createCorporateEmailFormat,
  getAllCorporateEmailFormat,
  updateCorporateEmailFormat,
  getSingleCorporateEmailFormat,
  deleteCorporateEmailFormat,
  createExerciseCorporateEmailFormat,
  getAllExerciseCorporateEmailFormat,
  deleteExerciseCorporateEmailFormat,
  updateDevelopSkillsFormatField,
  getDevelopSkillsFormatField,
  createDevelopSkillsFormat,
  getAllDevelopSkillsFormat,
  deleteDevelopSkillsFormat,
  getSingleDevelopSkillsFormat,
  updateDevelopSkillsFormat,
  createExerciseDevelopSkillsFormat,
  getAllExerciseDevelopSkillsFormat,
  deleteExerciseDevelopSkillsFormat,
  updateIdeaSharesFormatField,
  getIdeaSharesFormatField,
  createIdeaSharesFormat,
  getAllIdeaSharesFormat,
  deleteIdeaSharesFormat,
  getSingleIdeaSharesFormat,
  updateIdeaSharesFormat,
  createExerciseIdeaSharesFormat,
  getAllExerciseIdeaSharesFormat,
  deleteExerciseIdeaSharesFormat,
} = require("../controllers/sixLayerController");

const router = express.Router();

// idiom
router.get("/idiom", getAllIdiomFormat);
router.post("/idiom", createIdiomFormat);
router.delete("/idiom/:id", deleteIdiomFormat);
router.get("/idiom/:id", getSingleIdiomFormat);
router.put("/idiom/:id", updateIdiomFormat);
// Idiom field
router.put("/idiomField/:id", updateIdiomFormatField);
router.get("/idiomField", getIdiomFormatField);
// Idiom exercise
router.post("/createExerciseIdiom", createExerciseIdiomFormat);
router.get("/getAllExerciseIdiom", getAllExerciseIdiomFormat);
router.delete("/deleteExerciseIdiom/:id", deleteExerciseIdiomFormat);
// Vocabulary
router.get("/vocabulary", getAllVocabularyFormat);
router.post("/vocabulary", createVocabularyFormat);
router.delete("/vocabulary/:id", deleteVocabularyFormat);
router.get("/vocabulary/:id", getSingleVocabularyFormat);
router.put("/vocabulary/:id", updateVocabularyFormat);
// Vocabulary field
router.put("/vocabularyField/:id", updateVocabularyFormatField);
router.get("/vocabularyField", getVocabularyFormatField);
// Vocabulary exercise
router.post("/createExerciseVocabulary", createExerciseVocabularyFormat);
router.get("/getAllExerciseVocabulary", getAllExerciseVocabularyFormat);
router.delete("/deleteExerciseVocabulary/:id", deleteExerciseVocabularyFormat);

// elegant
router.get("/elegant", getAllElegantFormat);
router.post("/elegant", createElegantFormat);
router.delete("/elegant/:id", deleteElegantFormat);
router.get("/elegant/:id", getSingleElegantFormat);
router.put("/elegant/:id", updateElegantFormat);
// elegant field
router.put("/elegantField/:id", updateElegantFormatField);
router.get("/elegantField", getElegantFormatField);
// elegant exercise
router.post("/createExerciseElegant", createExerciseElegantFormat);
router.get("/getAllExerciseElegant", getAllExerciseElegantFormat);
router.delete("/deleteExerciseElegant/:id", deleteExerciseElegantFormat);

//  tantuster
router.get("/tantuster", getAllTantusterFormat);
router.post("/tantuster", createTantusterFormat);
router.delete("/tantuster/:id", deleteTantusterFormat);
router.get("/tantuster/:id", getSingleTantusterFormat);
router.put("/tantuster/:id", updateTantusterFormat);
// tantuster field
router.put("/tantusterField/:id", updateTantusterFormatField);
router.get("/tantusterField", getTantusterFormatField);
// tantuster exercise
router.post("/createExerciseTantuster", createExerciseTantusterFormat);
router.get("/getAllExerciseTantuster", getAllExerciseTantusterFormat);
router.delete("/deleteExerciseTantuster/:id", deleteExerciseTantusterFormat);

// new tantuster
router.get("/newtantuster", getAllNewTantusterFormat);
router.post("/newtantuster", createNewTantusterFormat);
router.delete("/newtantuster/:id", deleteNewTantusterFormat);
router.get("/newtantuster/:id", getSingleNewTantusterFormat);
router.put("/newtantuster/:id", updateNewTantusterFormat);
// new tantuster field
router.put("/newtantusterField/:id", updateNewTantusterFormatField);
router.get("/newtantusterField", getNewTantusterFormatField);
// new tantuster exercise
router.post("/createExerciseNewTantuster", createExerciseNewTantusterFormat);
router.get("/getAllExerciseNewTantuster", getAllExerciseNewTantusterFormat);
router.delete(
  "/deleteExerciseNewTantuster/:id",
  deleteExerciseNewTantusterFormat,
);

// sentence
router.get("/sentence", getAllSentenceFormat);
router.post("/sentence", createSentenceFormat);
router.delete("/sentence/:id", deleteSentenceFormat);
router.get("/sentence/:id", getSingleSentenceFormat);
router.put("/sentence/:id", updateSentenceFormat);
// sentence field
router.put("/sentenceField/:id", updateSentenceFormatField);
router.get("/sentenceField", getSentenceFormatField);
// sentence exercise
router.post("/createExerciseSentence", createExerciseSentenceFormat);
router.get("/getAllExerciseSentence", getAllExerciseSentenceFormat);
router.delete("/deleteExerciseSentence/:id", deleteExerciseSentenceFormat);

// Verb
router.get("/verb", getAllVerbFormat);
router.post("/verb", createVerbFormat);
router.delete("/verb/:id", deleteVerbFormat);
router.get("/verb/:id", getSingleVerbFormat);
router.put("/verb/:id", updateVerbFormat);
// Verb field
router.put("/verbField/:id", updateVerbFormatField);
router.get("/verbField", getVerbFormatField);
// Verb exercise
router.post("/createExerciseVerb", createExerciseVerbFormat);
router.get("/getAllExerciseVerb", getAllExerciseVerbFormat);
router.delete("/deleteExerciseVerb/:id", deleteExerciseVerbFormat);

// Tense
router.get("/tense", getAllTenseFormat);
router.post("/tense", createTenseFormat);
router.delete("/tense/:id", deleteTenseFormat);
router.get("/tense/:id", getSingleTenseFormat);
router.put("/tense/:id", updateTenseFormat);

// tense field
router.put("/tenseField/:id", updateTenseFormatField);
router.get("/tenseField", getTenseFormatField);
// Tense exercise
router.post("/createExerciseTense", createExerciseTenseFormat);
router.get("/getAllExerciseTense", getAllExerciseTenseFormat);
router.delete("/deleteExerciseTense/:id", deleteExerciseTenseFormat);
// Article
router.get("/article", getAllArticleFormat);
router.post("/article", createArticleFormat);
router.delete("/article/:id", deleteArticleFormat);
router.get("/article/:id", getSingleArticleFormat);
router.put("/article/:id", updateArticleFormat);
// Article field
router.put("/articleField/:id", updateArticleFormatField);
router.get("/articleField", getArticleFormatField);
// Article exercise
router.post("/createExerciseArticle", createExerciseArticleFormat);
router.get("/getAllExerciseArticle", getAllExerciseArticleFormat);
router.delete("/deleteExerciseArticle/:id", deleteExerciseArticleFormat);
// Preposition
router.get("/preposition", getAllPrepositionFormat);
router.post("/preposition", createPrepositionFormat);
router.delete("/preposition/:id", deletePrepositionFormat);
router.get("/preposition/:id", getSinglePrepositionFormat);
router.put("/preposition/:id", updatePrepositionFormat);
// Preposition field
router.put("/prepositionField/:id", updatePrepositionFormatField);
router.get("/prepositionField", getPrepositionFormatField);
// Preposition exercise
router.post("/createExercisePreposition", createExercisePrepositionFormat);
router.get("/getAllExercisePreposition", getAllExercisePrepositionFormat);
router.delete(
  "/deleteExercisePreposition/:id",
  deleteExercisePrepositionFormat,
);

// Good life style field
router.put("/goodLifeStyleField/:id", updateGoodLifeStyleFormatField);
router.get("/goodLifeStyleField", getGoodLifeStyleFormatField);
// Good Life style CRUD
router.post("/goodLifeStyle", createGoodLifeStyleFormat);
router.get("/goodLifeStyle", getAllGoodLifeStyleFormat);
router.delete("/goodLifeStyle/:id", deleteGoodLifeStyleFormat);
router.get("/goodLifeStyle/:id", getSingleGoodLifeStyleFormat);
router.put("/goodLifeStyle/:id", updateGoodLifeStyleFormat);
// Good life style exercise
router.post("/createExerciseGoodLifeStyle", createExerciseGoodLifeStyleFormat);
router.delete(
  "/deleteExerciseGoodLifeStyle/:id",
  deleteExerciseGoodLifeStyleFormat,
);
router.get("/getAllExerciseGoodLifeStyle", getAllExerciseGoodLifeStyleFormat);

// Interview Questions field
router.put("/interviewQuestionsField/:id", updateInterviewQuestionsFormatField);
router.get("/interviewQuestionsField", getInterviewQuestionsFormatField);
// Interview Questions CRUD
router.post("/interviewQuestions", createInterviewQuestionsFormat);
router.get("/interviewQuestions", getAllInterviewQuestionsFormat);
router.delete("/interviewQuestions/:id", deleteInterviewQuestionsFormat);
router.get("/interviewQuestions/:id", getSingleInterviewQuestionsFormat);
router.put("/interviewQuestions/:id", updateInterviewQuestionsFormat);
// Interview Questions exercise
router.post(
  "/createExerciseInterviewQuestions",
  createExerciseInterviewQuestionsFormat,
);
router.delete(
  "/deleteExerciseInterviewQuestions/:id",
  deleteExerciseInterviewQuestionsFormat,
);
router.get(
  "/getAllExerciseInterviewQuestions",
  getAllExerciseInterviewQuestionsFormat,
);

// Before professional field
router.put("/beforeProfessionalField/:id", updateBeforeProfessionalFormatField);
router.get("/beforeProfessionalField", getBeforeProfessionalFormatField);
// Before professional CRUD
router.get("/beforeProfessional", getAllBeforeProfessionalFormat);
router.post("/beforeProfessional", createBeforeProfessionalFormat);
router.get("/beforeProfessional/:id", getSingleBeforeProfessionalFormat);
router.put("/beforeProfessional/:id", updateBeforeProfessionalFormat);
router.delete("/beforeProfessional/:id", deleteBeforeProfessionalFormat);
// Before professional exercise
router.post(
  "/createExerciseBeforeProfessional",
  createExerciseBeforeProfessionalFormat,
);
router.delete(
  "/deleteExerciseBeforeProfessional/:id",
  deleteExerciseBeforeProfessionalFormat,
);
router.get(
  "/getAllExerciseBeforeProfessional",
  getAllExerciseBeforeProfessionalFormat,
);
// Corporate email field
router.put("/corporateEmailField/:id", updateCorporateEmailFormatField);
router.get("/corporateEmailField", getCorporateEmailFormatField);
// Corporate email CRUD
router.post("/corporateEmail", createCorporateEmailFormat);
router.get("/corporateEmail", getAllCorporateEmailFormat);
router.put("/corporateEmail/:id", updateCorporateEmailFormat);
router.get("/corporateEmail/:id", getSingleCorporateEmailFormat);
router.delete("/corporateEmail/:id", deleteCorporateEmailFormat);
// corporate email exercise
router.post(
  "/createExerciseCorporateEmail",
  createExerciseCorporateEmailFormat,
);
router.get("/getAllExerciseCorporateEmail", getAllExerciseCorporateEmailFormat);
router.delete(
  "/deleteExerciseCorporateEmail/:id",
  deleteExerciseCorporateEmailFormat,
);

// Develop your skills field
router.put("/developSkillsField/:id", updateDevelopSkillsFormatField);
router.get("/developSkillsField", getDevelopSkillsFormatField);
// Develop your skills CRUD
router.post("/developSkills", createDevelopSkillsFormat);
router.get("/developSkills", getAllDevelopSkillsFormat);
router.delete("/developSkills/:id", deleteDevelopSkillsFormat);
router.get("/developSkills/:id", getSingleDevelopSkillsFormat);
router.put("/developSkills/:id", updateDevelopSkillsFormat);
// Develop your skills exercise
router.post("/createExerciseDevelopSkills", createExerciseDevelopSkillsFormat);
router.get("/getAllExerciseDevelopSkills", getAllExerciseDevelopSkillsFormat);
router.delete(
  "/deleteExerciseDevelopSkills/:id",
  deleteExerciseDevelopSkillsFormat,
);
// Idea share field
router.put("/ideaSharesField/:id", updateIdeaSharesFormatField);
router.get("/ideaSharesField", getIdeaSharesFormatField);
// Idea share CRUD
router.post("/ideaShares", createIdeaSharesFormat);
router.get("/ideaShares", getAllIdeaSharesFormat);
router.delete("/ideaShares/:id", deleteIdeaSharesFormat);
router.get("/ideaShares/:id", getSingleIdeaSharesFormat);
router.put("/ideaShares/:id", updateIdeaSharesFormat);
// Idea Share exercise
router.post("/createExerciseIdeaShares", createExerciseIdeaSharesFormat);
router.get("/getAllExerciseIdeaShares", getAllExerciseIdeaSharesFormat);
router.delete("/deleteExerciseIdeaShares/:id", deleteExerciseIdeaSharesFormat);

module.exports = router;
