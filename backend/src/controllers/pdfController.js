const { ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {
  getAdminPdfUploadCollection,
  getUserPdfUploadCollection,
} = require("../config/db");

const adminPdfs = getAdminPdfUploadCollection();
const userPdfs = getUserPdfUploadCollection();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/pdfs";
    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed!"), false);
  },
});

// ================= Admin =================

// Admin Upload
const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const pdfData = {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      createdAt: new Date().toISOString(),
    };

    const result = await adminPdfs.insertOne(pdfData);
    res.status(201).json({ message: "PDF uploaded successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload PDF." });
  }
};

// Get All Admin PDFs
const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await adminPdfs.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch PDFs." });
  }
};

// Delete Admin PDF
const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    if (fs.existsSync(pdf.path)) fs.unlinkSync(pdf.path);
    await adminPdfs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete PDF." });
  }
};

// Download PDF
const downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    res.download(path.resolve(pdf.path), pdf.originalName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download PDF" });
  }
};

// ================= User =================

// User Upload (status: pending)
const userUploadPdf = async (req, res) => {
  try {
    const file = req.file;
    const { email } = req.body; // ✅ frontend থেকে আসা email
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    if (!email) return res.status(400).json({ message: "Email is required" });

    const pdfData = {
      email, // ✅ save user email
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const result = await userPdfs.insertOne(pdfData);
    res.status(201).json({ message: "PDF uploaded successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload PDF." });
  }
};

// Get All User PDFs (by email)
const userGetAllPdfs = async (req, res) => {
  try {
    const { email, status } = req.query;

    const query = {};
    if (email) query.email = email;
    if (status) query.status = status;

    const pdfs = await userPdfs
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch PDFs." });
  }
};

// Delete User PDF
const userDeletePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await userPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    if (fs.existsSync(pdf.path)) fs.unlinkSync(pdf.path);
    await userPdfs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete PDF." });
  }
};

// Admin Approve/Reject User PDF
const updatePdfStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "accepted" or "rejected"

    const result = await userPdfs.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "PDF not found" });

    res.status(200).json({ message: `PDF ${status} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update PDF status." });
  }
};
// Download PDF
// const userDownloadPdf = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid PDF ID" });
//     }

//     const pdf = await userPdfs.findOne({ _id: new ObjectId(id) });
//     if (!pdf) return res.status(404).json({ message: "PDF not found" });

//     if (!fs.existsSync(pdf.path)) {
//       return res.status(404).json({ message: "File not found on server" });
//     }

//     res.download(path.resolve(pdf.path), pdf.originalName);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to download PDF" });
//   }
// };

const userDownloadPdf = async (req, res) => {
  try {
    const { id } = req.params;

    // ID validate
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid PDF ID" });

    // এখানে userPdfs collection ব্যবহার
    const pdf = await userPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    // ফাইল server এ আছে কি না চেক
    if (!fs.existsSync(pdf.path)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.download(path.resolve(pdf.path), pdf.originalName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download PDF" });
  }
};



module.exports = {
  upload,
  uploadPdf,
  getAllPdfs,
  deletePdf,
  downloadPdf,
  userUploadPdf,
  userGetAllPdfs,
  userDeletePdf,
  updatePdfStatus,
  userDownloadPdf,

};
