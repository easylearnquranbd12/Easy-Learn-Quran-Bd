const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://Network-Online-Service:3jMat0WHg0uF8lR7@network-online-service.bfjpnvo.mongodb.net/?retryWrites=true&w=majority`;

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
  return client.db("Network-Online-Service").collection("users");
};
const getCourseCollection = () => {
  return client.db("Network-Online-Service").collection("courses");
};
const getEnrollmentCollection = () => {
  return client.db("Network-Online-Service").collection("enrollments");
};
const getBlogsCollection = () => {
  return client.db("Network-Online-Service").collection("blog");
};
const getBannersCollection = () => {
  return client.db("Network-Online-Service").collection("banner");
};
const getInstructorsCollection = () => {
  return client.db("Network-Online-Service").collection("instructors");
};
const getAddPaymentMethodCollection = () => {
  return client.db("Network-Online-Service").collection("AddPaymentMethod");
};
const getNotesCollection = () => {
  return client.db("Network-Online-Service").collection("Notes");
}
const getYouTubeCollection = () => {
  return client.db("Network-Online-Service").collection("VideoCollection");
};
const getImageAndTextCollection = () => {
  return client.db("Network-Online-Service").collection("ImageAndText");
};
const getAuthorTextCollection = () => {
  return client.db("Network-Online-Service").collection("AuthorInfo");
};
const getSocialLinksCollection = () => {
  return client.db("Network-Online-Service").collection("SocialLinks");
};
module.exports = {
  connectDB,
  getUserCollection,
  getCourseCollection,
  getEnrollmentCollection,
  getBlogsCollection,
  getBannersCollection,
  getInstructorsCollection,
  getAddPaymentMethodCollection,
  getNotesCollection,
  getImageAndTextCollection,
  getYouTubeCollection,
  getAuthorTextCollection,
  getSocialLinksCollection
};
