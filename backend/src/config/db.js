const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri =
  "mongodb+srv://Shapion:1WOvPQzOr1fdRSng@shapion-quiz-platform.wmwc3it.mongodb.net/?appName=Shapion-Quiz-Platform";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  await client.connect();
  console.log("✅ MongoDB connected successfully.");
};

const getUserCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("users");
};
const getBlogsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("blog");
};

// First Layer
// vocabulary
const getFirstLayerVocabularyCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("VocabularyField");
};
const getFirstLayerVocabularyCollections = () => {
  return client.db("Shapion-Quiz-Platform").collection("Vocabulary");
};
const getFirstLayerVocabularyExerciseCollections = () => {
  return client.db("Shapion-Quiz-Platform").collection("CreateExercise");
};
// idiom
const getFirstLayerIdiomCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdiomField");
};
const getFirstLayerIdiomCollections = () => {
  return client.db("Shapion-Quiz-Platform").collection("Idiom");
};
const getFirstLayerIdiomExerciseCollections = () => {
  return client.db("Shapion-Quiz-Platform").collection("createExerciseIdiom");
};

// elegant
const getFirstLayerElegantFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ElegantField");
};
const getFirstLayerElegantCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Elegant");
};
const getFirstLayerElegantExerciseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("createExerciseElegant");
};
// Tantuster
const getFirstLayerTantusterFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TantusterField");
};
const getFirstLayerTantusterCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Tantuster");
};
const getFirstLayerTantusterExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseTantuster");
};
//new Tantuster
const getFirstLayerNewTantusterFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("NewTantusterField");
};
const getFirstLayerNewTantusterCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("NewTantuster");
};
const getFirstLayerNewTantusterExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseNewTantuster");
};

// second layer
// sentence
const getSecondLayerSentenceFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("SentenceField");
};
const getSecondLayerSentenceCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Sentence");
};
const getSecondLayerSentenceExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseSentence");
};
// Verb
const getSecondLayerVerbFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("VerbField");
};
const getSecondLayerVerbCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Verb");
};
const getSecondLayerVerbExerciseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("createExerciseVerb");
};
// Article
const getSecondLayerArticleFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ArticleField");
};
const getSecondLayerArticleCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Article");
};
const getSecondLayerArticleExerciseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("createExerciseArticle");
};
// Tense
const getSecondLayerTenseFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TenseField");
};
const getSecondLayerTenseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Tense");
};
const getSecondLayerTenseExerciseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("createExerciseTense");
};
// Preposition
const getSecondLayerPrepositionFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("PrepositionField");
};
const getSecondLayerPrepositionCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Preposition");
};
const getSecondLayerPrepositionExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExercisePreposition");
};

// third layer

// ✅ Good Life Style
const getThirdLayerGoodLifeStyleFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodLifeStyleField");
};
const getThirdLayerGoodLifeStyleCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodLifeStyle");
};
const getThirdLayerGoodLifeStyleExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodLifeStyle");
};
// ✅ Interviews Qustions
const getThirdLayerInterviewQuestionsFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("InterviewQuestionsField");
};
const getThirdLayerInterviewQuestionsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("InterviewQuestions");
};
const getThirdLayerInterviewQuestionsExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseInterviewQuestions");
};

// ✅ Before Professional
const getThirdLayerBeforeProfessionalFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("BeforeProfessionalField");
};
const getThirdLayerBeforeProfessionalCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("BeforeProfessional");
};
const getThirdLayerBeforeProfessionalExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseBeforeProfessional");
};

// ✅ Corporate Email
const getThirdLayerCorporateEmailFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("CorporateEmailField");
};
const getThirdLayerCorporateEmailCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("CorporateEmail");
};
const getThirdLayerCorporateEmailExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseCorporateEmail");
};

// ✅ Develop Your Skills
const getThirdLayerDevelopSkillsFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("DevelopSkillsField");
};
const getThirdLayerDevelopSkillsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("DevelopSkills");
};
const getThirdLayerDevelopSkillsExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseDevelopSkills");
};
// ✅ idea Sharre Your Skills
const getThirdLayerIdeaSharesFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdeaSharesField");
};
const getThirdLayerIdeaSharesCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdeaShares");
};
const getThirdLayerIdeaSharesExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseDevelopSkills");
};

// Four layer
// Travelling
const getFourthLayerTravelingFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TravelingField");
};
const getFourthLayerTravelingCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Traveling");
};
const getFourthLayerTravelingExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseTraveling");
};

// Good Song
const getFourthLayerGoodSongFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodSongField");
};
const getFourthLayerGoodSongCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodSong");
};
const getFourthLayerGoodSongExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodSong");
};
// Good Movie
const getFourthLayerGoodMovieFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodMovieField");
};
const getFourthLayerGoodMovieCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodMovie");
};
const getFourthLayerGoodMovieExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodMovie");
};
// Good Porem
const getFourthLayerGoodPoremFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodPoremField");
};
const getFourthLayerGoodPoremCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodPorem");
};
const getFourthLayerGoodPoremExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodPorem");
};
// Good Nobel
const getFourthLayerGoodNobelFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodNobelField");
};
const getFourthLayerGoodNobelCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodNobel");
};
const getFourthLayerGoodNobelExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodNobel");
};

// Five layer
// ✅ Old Generation (Five Layer)
const getFiveLayerOldGenerationFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("OldGenerationField");

const getFiveLayerOldGenerationCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("OldGeneration");

const getFiveLayerOldGenerationExerciseCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("OldGenerationExercise");

// ✅ Story Writing (Five Layer)
const getFiveLayerStoryWritingFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("StoryWritingField");

const getFiveLayerStoryWritingCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("StoryWriting");

const getFiveLayerStoryWritingExerciseCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("StoryWritingExercise");

// ✅ Letter Writing (Five Layer)
const getFiveLayerLetterWritingFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("LetterWritingField");

const getFiveLayerLetterWritingCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("LetterWriting");

const getFiveLayerLetterWritingExerciseCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("LetterWritingExercise");
// ✅ MCq Writing (Five Layer)
const getFiveLayerMcqFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("McqField");

const getFiveLayerMcqCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("Mcq");

// Six Layer
// vocabularyFormat
const getSixLayerVocabularyFormatField = () => {
  return client.db("Shapion-Quiz-Platform").collection("VocabularyFormatField");
};
const getSixLayerVocabularyFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("VocabularyFormat");
};
const getSixLayerVocabularyFormatExerciseCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("CreateExerciseFormat");
};
// idiom
const getSixLayerIdiomFormatField = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdiomFormatField");
};
const getSixLayerIdiomFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdiomFormat");
};
const getSixLayerIdiomFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("CreateExerciseIdiomFormat");
};

// elegant
const getSixLayerElegantFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ElegantFormatField");
};
const getSixLayerElegantFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ElegantFormat");
};
const getSixLayerElegantFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("CreateExerciseElegantFormat");
};
// Tantuster
const getSixLayerTantusterFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TantusterFormatField");
};
const getSixLayerTantusterFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TantusterFormat");
};
const getSixLayerTantusterFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("CreateExerciseTantusterFormat");
};
//new Tantuster
const getSixLayerNewTantusterFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("NewTantusterFormatField");
};
const getSixLayerNewTantusterFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("NewTantusterFormat");
};
const getSixLayerNewTantusterFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("CreateExerciseNewTantusterFormat");
};

// Six layer Format
// sentence Format
const getSixLayerSentenceFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("SentenceFormatField");
};
const getSixLayerSentenceFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("SentenceFormat");
};
const getSixLayerSentenceFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseSentenceFormat");
};
// Verb
const getSixLayerVerbFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("VerbFormatField");
};
const getSixLayerVerbFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("VerbFormat");
};
const getSixLayerVerbFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseVerbFormat");
};
// Article
const getSixLayerArticleFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ArticleFormatField");
};
const getSixLayerArticleFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ArticleFormat");
};
const getSixLayerArticleFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseArticleFormat");
};
// Tense
const getSixLayerTenseFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TenseFormatField");
};
const getSixLayerTenseFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("TenseFormat");
};
const getSixLayerTenseFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseTenseFormat");
};
// Preposition
const getSixLayerPrepositionFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("PrepositionFormatField");
};
const getSixLayerPrepositionFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("PrepositionFormat");
};
const getSixLayerPrepositionFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExercisePrepositionFormat");
};

// third layer Format

// ✅ Good Life Style
const getSixLayerGoodLifeStyleFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("GoodLifeStyleFormatField");
};
const getSixLayerGoodLifeStyleFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("GoodLifeStyleFormat");
};
const getSixLayerGoodLifeStyleFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseGoodLifeStyleFormat");
};
// ✅ Interviews Qustions
const getSixLayerInterviewQuestionsFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("InterviewQuestionsFormatField");
};
const getSixLayerInterviewQuestionsFormatCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("InterviewQuestionsFormat");
};
const getSixLayerInterviewQuestionsFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseInterviewQuestionsFormat");
};

// ✅ Before Professional
const getSixLayerBeforeProfessionalFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("BeforeProfessionalFormatField");
};
const getSixLayerBeforeProfessionalFormatCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("BeforeProfessionalFormat");
};
const getSixLayerBeforeProfessionalFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseBeforeProfessionalFormat");
};

// ✅ Corporate Email
const getSixLayerCorporateEmailFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("CorporateEmailFormatField");
};
const getSixLayerCorporateEmailFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("CorporateEmailFormat");
};
const getSixLayerCorporateEmailFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseCorporateEmailFormat");
};

// ✅ Develop Your Skills
const getSixLayerDevelopSkillsFormatFieldsCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("DevelopSkillsFormatField");
};
const getSixLayerDevelopSkillsFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("DevelopSkillsFormat");
};
const getSixLayerDevelopSkillsFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseDevelopSkillsFormat");
};
// ✅ idea Sharre Your Skills
const getSixLayerIdeaSharesFormatFieldsCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdeaSharesFormatField");
};
const getSixLayerIdeaSharesFormatCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("IdeaSharesFormat");
};
const getSixLayerIdeaSharesFormatExerciseCollection = () => {
  return client
    .db("Shapion-Quiz-Platform")
    .collection("createExerciseIdeaSharesFormat");
};

const getOthersCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("Others");
const getForNextCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("ForNext");

const getLayerManagementFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("LevelManagementField");
// pdf Upload admin panel
const getAdminPdfUploadCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("PdfUploads");
const getUserPdfUploadCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("UserPdfUploads");
const getBlankPdfUploadCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("BlankPdfUploads");

const getAddPaymentMethodCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("AddPaymentMethod");
};
const getUserPaymentCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("UserPayment");
};
const getUserPdfPaymentMethodCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("UserPdfPaymentMethod");
};
const getUserNobelCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("UserNobel");
};
const getPromotionCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("Promotions");
};
const getImageAndTextCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("ImageAndText");
};
const getAuthorTextCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("AuthorInfo");
};
const getSocialLinksCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("SocialLinks");
};
const getBannersCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("banner");
};
const getSuccessStoriesCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("SuccessStories");
};
module.exports = {
  connectDB,
  getUserCollection,
  getBlogsCollection,
  getBannersCollection,

  getUserPaymentCollection,
  getAddPaymentMethodCollection,

  getImageAndTextCollection,
  getAuthorTextCollection,
  getSocialLinksCollection,
  getPromotionCollection,
  getUserNobelCollection,
  // Layers Management Colllections
  getLayerManagementFieldsCollection,
  // PDF Upload Admin Panel
  getAdminPdfUploadCollection,
  getUserPdfUploadCollection,
  getBlankPdfUploadCollection,

  getFirstLayerVocabularyCollection,
  getFirstLayerVocabularyCollections,
  getFirstLayerVocabularyExerciseCollections,

  getSecondLayerSentenceCollection,
  getSecondLayerSentenceFieldsCollection,
  getSecondLayerSentenceExerciseCollection,

  getFirstLayerElegantFieldsCollection,
  getFirstLayerElegantCollection,
  getFirstLayerElegantExerciseCollection,

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

  getFourthLayerGoodSongFieldsCollection,
  getFourthLayerGoodSongCollection,
  getFourthLayerGoodSongExerciseCollection,

  getFourthLayerGoodMovieFieldsCollection,
  getFourthLayerGoodMovieCollection,
  getFourthLayerGoodMovieExerciseCollection,

  getFirstLayerTantusterFieldsCollection,
  getFirstLayerTantusterCollection,
  getFirstLayerTantusterExerciseCollection,

  getFirstLayerNewTantusterFieldsCollection,
  getFirstLayerNewTantusterCollection,
  getFirstLayerNewTantusterExerciseCollection,

  getFirstLayerIdiomCollection,
  getFirstLayerIdiomCollections,
  getFirstLayerIdiomExerciseCollections,
  getUserPdfPaymentMethodCollection,

  getThirdLayerGoodLifeStyleFieldsCollection,
  getThirdLayerGoodLifeStyleCollection,
  getThirdLayerGoodLifeStyleExerciseCollection,

  getThirdLayerInterviewQuestionsFieldsCollection,
  getThirdLayerInterviewQuestionsCollection,
  getThirdLayerInterviewQuestionsExerciseCollection,

  getThirdLayerBeforeProfessionalFieldsCollection,
  getThirdLayerBeforeProfessionalCollection,
  getThirdLayerBeforeProfessionalExerciseCollection,

  getThirdLayerCorporateEmailFieldsCollection,
  getThirdLayerCorporateEmailCollection,
  getThirdLayerCorporateEmailExerciseCollection,

  getThirdLayerDevelopSkillsFieldsCollection,
  getThirdLayerDevelopSkillsCollection,
  getThirdLayerDevelopSkillsExerciseCollection,

  getThirdLayerIdeaSharesCollection,
  getThirdLayerIdeaSharesFieldsCollection,
  getThirdLayerIdeaSharesExerciseCollection,

  getFiveLayerOldGenerationCollection,
  getFiveLayerOldGenerationFieldsCollection,
  getFiveLayerOldGenerationExerciseCollection,

  getFiveLayerLetterWritingCollection,
  getFiveLayerLetterWritingFieldsCollection,
  getFiveLayerLetterWritingExerciseCollection,

  getFiveLayerMcqCollection,
  getFiveLayerMcqFieldsCollection,

  getFiveLayerStoryWritingCollection,
  getFiveLayerStoryWritingFieldsCollection,
  getFiveLayerStoryWritingExerciseCollection,

  getFourthLayerTravelingCollection,
  getFourthLayerTravelingFieldsCollection,
  getFourthLayerTravelingExerciseCollection,

  getFourthLayerGoodPoremCollection,
  getFourthLayerGoodPoremFieldsCollection,
  getFourthLayerGoodPoremExerciseCollection,

  getFourthLayerGoodNobelCollection,
  getFourthLayerGoodNobelFieldsCollection,
  getFourthLayerGoodNobelExerciseCollection,

  getSuccessStoriesCollection,
  getOthersCollection,
  getForNextCollection,
  // Six Layer
  getSixLayerVocabularyFormatField,
  getSixLayerVocabularyFormatCollection,
  getSixLayerVocabularyFormatExerciseCollection,
  getSixLayerIdiomFormatField,
  getSixLayerIdiomFormatCollection,
  getSixLayerIdiomFormatExerciseCollection,
  getSixLayerElegantFormatFieldsCollection,
  getSixLayerElegantFormatCollection,
  getSixLayerElegantFormatExerciseCollection,
  getSixLayerTantusterFormatFieldsCollection,
  getSixLayerTantusterFormatCollection,
  getSixLayerTantusterFormatExerciseCollection,
  getSixLayerNewTantusterFormatFieldsCollection,
  getSixLayerNewTantusterFormatCollection,
  getSixLayerNewTantusterFormatExerciseCollection,
  // second layer format
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
  // Third layer format
  getSixLayerGoodLifeStyleFormatFieldsCollection,
  getSixLayerGoodLifeStyleFormatCollection,
  getSixLayerGoodLifeStyleFormatExerciseCollection,
  getSixLayerInterviewQuestionsFormatFieldsCollection,
  getSixLayerInterviewQuestionsFormatCollection,
  getSixLayerInterviewQuestionsFormatExerciseCollection,
  getSixLayerBeforeProfessionalFormatFieldsCollection,
  getSixLayerBeforeProfessionalFormatCollection,
  getSixLayerBeforeProfessionalFormatExerciseCollection,
  getSixLayerCorporateEmailFormatFieldsCollection,
  getSixLayerCorporateEmailFormatCollection,
  getSixLayerCorporateEmailFormatExerciseCollection,
  getSixLayerDevelopSkillsFormatFieldsCollection,
  getSixLayerDevelopSkillsFormatCollection,
  getSixLayerDevelopSkillsFormatExerciseCollection,
  getSixLayerIdeaSharesFormatFieldsCollection,
  getSixLayerIdeaSharesFormatCollection,
  getSixLayerIdeaSharesFormatExerciseCollection,
};
