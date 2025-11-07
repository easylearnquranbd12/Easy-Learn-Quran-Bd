const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// const uri = `mongodb+srv://Network-Online-Service:3jMat0WHg0uF8lR7@Learning-Quiz-Platfrom.bfjpnvo.mongodb.net/Shapion-Quiz-Platform-Paid?retryWrites=true&w=majority`;

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

// const getUserCollection = () => {
//   return client.db("Learning-Quiz-Platfrom").collection("users");
// };
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
  return client.db("Shapion-Quiz-Platform").collection("createExercise");
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

const getLayerManagementFieldsCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("LevelManagementField");
// pdf Upload admin panel
const getAdminPdfUploadCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("PdfUploads");
const getUserPdfUploadCollection = () =>
  client.db("Shapion-Quiz-Platform").collection("UserPdfUploads");

const getAddPaymentMethodCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("AddPaymentMethod");
};
const getUserPaymentCollection = () => {
  return client.db("Shapion-Quiz-Platform").collection("UserPayment");
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
  // Layers Management Colllections
  getLayerManagementFieldsCollection,
  // PDF Upload Admin Panel
  getAdminPdfUploadCollection,
  getUserPdfUploadCollection,

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

  getThirdLayerGoodLifeStyleFieldsCollection,
  getThirdLayerGoodLifeStyleCollection,
  getThirdLayerGoodLifeStyleExerciseCollection,

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
};
