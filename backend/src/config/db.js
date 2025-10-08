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
  getSecondLayerSentenceCollection,
  getFirstLayerVocabularyCollection,
  getFirstLayerVocabularyCollections,
  getFirstLayerVocabularyExerciseCollections,
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
};
