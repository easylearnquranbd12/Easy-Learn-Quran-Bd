

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
  updatePdfType,
  getFreePdfs,
  getPaidPdfs,
  checkPdfAccess,
  recordPdfPurchase,
  getUserPurchasedPdfs,
  getPaymentMethods,
  savePaymentMethods,
} = require("../controllers/pdfController");
const router = express.Router();

// ===== Admin Routes =====
// router.post("/upload", upload.single("pdf"), uploadPdf);
// router.get("/", getAllPdfs);
// router.delete("/:id", deletePdf);
// router.get("/download/:id", downloadPdf);


router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/", getAllPdfs);
router.patch("/:id", updatePdfType);
router.delete("/:id", deletePdf);
router.get("/download/:id", downloadPdf);

// Public routes
router.get("/free", getFreePdfs);
router.get("/paid", getPaidPdfs);
router.get("/access", checkPdfAccess);

// User purchase routes
router.post("/purchase", recordPdfPurchase);
router.get("/user/:userId", getUserPurchasedPdfs);
// GET payment methods
router.get("/payment-methods", getPaymentMethods);
// POST save payment methods
router.post("/payment-methods", savePaymentMethods);



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
