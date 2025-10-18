const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// const uri = `mongodb+srv://Construction-Projects:dcw48n9B0WuIIFwp@construction-projects.z7ox4nb.mongodb.net/Learning-Quiz-Platfrom?retryWrites=true&w=majority&appName=Construction-Projects`;
const uri = `mongodb+srv://Network-Online-Service:3jMat0WHg0uF8lR7@network-online-service.bfjpnvo.mongodb.net/Learning-Quiz-Platfrom-Paid?retryWrites=true&w=majority`;

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
  return client.db("Learning-Quiz-Platfrom").collection("users");
};
const getBlogsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("blog");
};
// First Layer
// vocabulary
const getFirstLayerVocabularyCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("VocabularyField");
};
const getFirstLayerVocabularyCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Vocabulary");
};
const getFirstLayerVocabularyExerciseCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("createExercise");
};
// idiom
const getFirstLayerIdiomCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("IdiomField");
};
const getFirstLayerIdiomCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Idiom");
};
const getFirstLayerIdiomExerciseCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("createExerciseIdiom");
};

// elegant
const getFirstLayerElegantFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("ElegantField");
};
const getFirstLayerElegantCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Elegant");
};
const getFirstLayerElegantExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseElegant");
};
// Tantuster
const getFirstLayerTantusterFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("TantusterField");
};
const getFirstLayerTantusterCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Tantuster");
};
const getFirstLayerTantusterExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseTantuster");
};
//new Tantuster
const getFirstLayerNewTantusterFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("NewTantusterField");
};
const getFirstLayerNewTantusterCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("NewTantuster");
};
const getFirstLayerNewTantusterExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseNewTantuster");
};

// second layer
// sentence
const getSecondLayerSentenceFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("SentenceField");
};
const getSecondLayerSentenceCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Sentence");
};
const getSecondLayerSentenceExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseSentence");
};
// Verb
const getSecondLayerVerbFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("VerbField");
};
const getSecondLayerVerbCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Verb");
};
const getSecondLayerVerbExerciseCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("createExerciseVerb");
};
// Article
const getSecondLayerArticleFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("ArticleField");
};
const getSecondLayerArticleCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Article");
};
const getSecondLayerArticleExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseArticle");
};
// Tense
const getSecondLayerTenseFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("TenseField");
};
const getSecondLayerTenseCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Tense");
};
const getSecondLayerTenseExerciseCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("createExerciseTense");
};
// Preposition
const getSecondLayerPrepositionFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("PrepositionField");
};
const getSecondLayerPrepositionCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Preposition");
};
const getSecondLayerPrepositionExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExercisePreposition");
};
// third layer
// Good Life Style
// const getThirdLayerGoodLifeStyleFieldsCollection = () => {
//   return client.db("Learning-Quiz-Platfrom").collection("GoodLifeStyleField");
// };
// const getThirdLayerGoodLifeStyleCollection = () => {
//   return client.db("Learning-Quiz-Platfrom").collection("GoodLifeStyle");
// };
// const getThirdLayerGoodLifeStyleExerciseCollection = () => {
//   return client
//     .db("Learning-Quiz-Platfrom")
//     .collection("createExerciseGoodLifeStyle");
// };
// // Before Professional
// const getThirdLayerBeforeProfessionalFieldsCollection = () => {
//   return client
//     .db("Learning-Quiz-Platfrom")
//     .collection("BeforeProfessionalField");
// };
// const getThirdLayerBeforeProfessionalCollection = () => {
//   return client.db("Learning-Quiz-Platfrom").collection("BeforeProfessional");
// };
// const getThirdLayerBeforeProfessionalExerciseCollection = () => {
//   return client
//     .db("Learning-Quiz-Platfrom")
//     .collection("createExerciseBeforeProfessional");
// };

// third layer

// ✅ Good Life Style
const getThirdLayerGoodLifeStyleFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("GoodLifeStyleField");
};
const getThirdLayerGoodLifeStyleCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("GoodLifeStyle");
};
const getThirdLayerGoodLifeStyleExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseGoodLifeStyle");
};

// ✅ Before Professional
const getThirdLayerBeforeProfessionalFieldsCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("BeforeProfessionalField");
};
const getThirdLayerBeforeProfessionalCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("BeforeProfessional");
};
const getThirdLayerBeforeProfessionalExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseBeforeProfessional");
};

// ✅ Corporate Email
const getThirdLayerCorporateEmailFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("CorporateEmailField");
};
const getThirdLayerCorporateEmailCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("CorporateEmail");
};
const getThirdLayerCorporateEmailExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseCorporateEmail");
};

// ✅ Develop Your Skills
const getThirdLayerDevelopSkillsFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("DevelopSkillsField");
};
const getThirdLayerDevelopSkillsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("DevelopSkills");
};
const getThirdLayerDevelopSkillsExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseDevelopSkills");
};

// Four layer
// Good Song
const getFourthLayerGoodSongFieldsCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("GoodSongField");
};
const getFourthLayerGoodSongCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("GoodSong");
};
const getFourthLayerGoodSongExerciseCollection = () => {
  return client
    .db("Learning-Quiz-Platfrom")
    .collection("createExerciseGoodSong");
};

// Five layer
// ✅ Old Generation (Five Layer)
const getFiveLayerOldGenerationFieldsCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("OldGenerationField");

const getFiveLayerOldGenerationCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("OldGeneration");

const getFiveLayerOldGenerationExerciseCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("OldGenerationExercise");

// ✅ Story Writing (Five Layer)
const getFiveLayerStoryWritingFieldsCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("StoryWritingField");

const getFiveLayerStoryWritingCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("StoryWriting");

const getFiveLayerStoryWritingExerciseCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("StoryWritingExercise");

// ✅ Letter Writing (Five Layer)
const getFiveLayerLetterWritingFieldsCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("LetterWritingField");

const getFiveLayerLetterWritingCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("LetterWriting");

const getFiveLayerLetterWritingExerciseCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("LetterWritingExercise");
// ✅ MCq Writing (Five Layer)
const getFiveLayerMcqFieldsCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("McqField");

const getFiveLayerMcqCollection = () =>
  client.db("Learning-Quiz-Platfrom").collection("Mcq");

// const getFiveLayerMcqExerciseCollection = () =>
//   client.db("Learning-Quiz-Platfrom").collection("McqExercise");

const getAddPaymentMethodCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("AddPaymentMethod");
};
const getPromotionCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Promotions");
};
const getImageAndTextCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("ImageAndText");
};
const getAuthorTextCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("AuthorInfo");
};
const getSocialLinksCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("SocialLinks");
};
const getBannersCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("banner");
};
module.exports = {
  connectDB,
  getUserCollection,
  getBlogsCollection,
  getBannersCollection,
  getAddPaymentMethodCollection,
  getImageAndTextCollection,
  getAuthorTextCollection,
  getSocialLinksCollection,
  getPromotionCollection,

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
