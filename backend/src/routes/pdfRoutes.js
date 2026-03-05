

const express = require("express");
const {
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
  uploadBlankPdf,
  getAllBlankPdfs,
  deleteBlankPdf,
  downloadBlankPdf,
} = require("../controllers/pdfController");
const router = express.Router();

// ===== Admin Routes =====
router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/", getAllPdfs);
router.delete("/:id", deletePdf);
router.get("/download/:id", downloadPdf);

// ===== User Routes =====
router.post("/user/upload", upload.single("pdf"), userUploadPdf);
router.get("/user", userGetAllPdfs);
router.delete("/user/:id", userDeletePdf);
router.put("/user/status/:id", updatePdfStatus);
router.get("/user/download/:id", userDownloadPdf);
// ===== Blank Pdf Format Routes =====
router.post("/blank/upload", upload.single("pdf"), uploadBlankPdf);
router.get("/blank", getAllBlankPdfs);
router.delete("/blank/:id", deleteBlankPdf);
router.get("/blank/download/:id", downloadBlankPdf);

module.exports = router;
