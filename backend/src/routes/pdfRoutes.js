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
  getPendingPayments,
  verifyPayment,
  deletePayment,
} = require("../controllers/pdfController");

const router = express.Router();

// ===== Admin Routes =====
router.post("/upload", upload.single("pdf"), uploadPdf);
router.get("/", getAllPdfs);
router.patch("/:id", updatePdfType);
router.delete("/:id", deletePdf);
router.get("/download/:id", downloadPdf);

// Public routes
router.get("/free", getFreePdfs);
router.get("/paid", getPaidPdfs);

// User purchase routes
router.post("/purchase", upload.none(), recordPdfPurchase);
router.get('/user-purchases/:email', getUserPurchasedPdfs);
// Admin
router.get("/payments", getPendingPayments);
router.patch("/payments/:id", verifyPayment);
// Delete payment
router.delete("/payments/:id", deletePayment);
// Access check
router.get("/access", checkPdfAccess);

// GET payment methods
router.get("/payment-methods", getPaymentMethods);
router.post("/payment-methods", savePaymentMethods);
// router.post("/purchase", recordPdfPurchase);

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
