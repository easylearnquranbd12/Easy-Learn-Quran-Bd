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
const getFirstLayerVocabularyCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("VocabularyField");
};
const getFirstLayerVocabularyCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Vocabulary");
};
const getFirstLayerVocabularyExerciseCollections = () => {
  return client.db("Learning-Quiz-Platfrom").collection("createExercise");
};
const getFirstLayerSentenceCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("sentence");
};
const getFirstLayerElegantCollection = () => {
  return client.db("Learning-Quiz-Platfrom").collection("Elegant");
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
  getFirstLayerSentenceCollection,
  getFirstLayerElegantCollection,
  getFirstLayerVocabularyCollection,
  getFirstLayerVocabularyCollections,
  getFirstLayerVocabularyExerciseCollections,
};
