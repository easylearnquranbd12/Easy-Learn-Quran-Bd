const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri =
  "mongodb+srv://easylearnquranbd12:ye4CqQNh8NMOzpKO@cluster0.wybtx5o.mongodb.net/Easy-Learn-Quran-BD?retryWrites=true&w=majority";
  

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
  return client.db("Easy-Learn-Quran-BD").collection("users");
};
const getBlogsCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("blog");
};
const getAboutPagesCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("AboutPages");
};

const getImageAndTextCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("ImageAndText");
};
const getAuthorTextCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("AuthorInfo");
};
const getSocialLinksCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("SocialLinks");
};
const getBannersCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("banner");
};
const getSuccessStoriesCollection = () => {
  return client.db("Easy-Learn-Quran-BD").collection("SuccessStories");
};
module.exports = {
  connectDB,
  getUserCollection,
  getBlogsCollection,
  getAboutPagesCollection,
  getBannersCollection,
  getImageAndTextCollection,
  getAuthorTextCollection,
  getSocialLinksCollection,
  getSuccessStoriesCollection,
};
