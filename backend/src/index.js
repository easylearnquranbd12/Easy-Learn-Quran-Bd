const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const paymentMethodRouter = require("./routes/paymentMethodRoutes");
const imageandTextRouter = require("./routes/authorRoutes");
const authorRoute = require("./routes/authorRoutes");
const socialLinksRouter = require("./routes/socialLinksRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const translateRoutes = require("./routes/translateRoutes");
const mediaUploadRoutes = require("./routes/mediaUploadRoutes");
const firstLayerRoutes = require("./routes/firstLayerRoutes");
const secondLayerRoutes = require("./routes/secondLayerRoutes");
const fourthLayerRoutes = require("./routes/fourthLayerRoutes");
const thirdLayerRoutes = require("./routes/thirdlayerRoutes");
const fiveLayerRoutes = require("./routes/fiveLayerRoutes");
const layerManagementRoutes = require("./routes/layerManagementRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin); // reflect the request origin
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB().catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/blog", blogRouter);
app.use("/banner", bannerRouter);
app.use("/payment", paymentMethodRouter);
app.use("/imageandtext", imageandTextRouter);
app.use("/authorInfo", authorRoute);
app.use("/api/admin/social-links", socialLinksRouter);
app.use("/api/promotions", promotionRoutes);
app.use("/api/translate", translateRoutes);
app.use("/delete-media", mediaUploadRoutes);
app.use("/first-layer", firstLayerRoutes);
app.use("/second-layer", secondLayerRoutes);
app.use("/third-layer", thirdLayerRoutes);
app.use("/fourth-layer", fourthLayerRoutes);
app.use("/five-layer", fiveLayerRoutes);
app.use("/layer-management", layerManagementRoutes);
app.use("/pdf", pdfRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("Learning Quiz Platfrom Server Running");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
