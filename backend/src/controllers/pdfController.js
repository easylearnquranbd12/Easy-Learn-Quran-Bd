const { ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {
  getAdminPdfUploadCollection,
  getUserPdfUploadCollection,
  getBlankPdfUploadCollection,
  getUserPdfPaymentMethodCollection,
} = require("../config/db");
const { get } = require("http");

const adminPdfs = getAdminPdfUploadCollection();
const userPdfs = getUserPdfUploadCollection();
const blankPdfs = getBlankPdfUploadCollection();
const paymentMethods = getUserPdfPaymentMethodCollection();
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

// ================= Admin PDF Upload =================
const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const { type, price, tittle, description } = req.body;

    let PdfThumbnil = null;
    if (req.body.PdfThumbnil) {
      PdfThumbnil = req.body.PdfThumbnil;
    }

    const pdfData = {
      tittle: tittle || file.originalname,
      PdfThumbnil: PdfThumbnil || null,
      description: description || "",
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      type: type || "free",
      price: type === "paid" ? parseFloat(price) || 0 : 0,
      createdAt: new Date().toISOString(),
    };

    const result = await adminPdfs.insertOne(pdfData);

    res.status(201).json({
      message: "PDF uploaded successfully",
      result,
      data: pdfData,
    });
  } catch (error) {
    console.error("Upload error:", error);
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

// Update PDF Type and Price
const updatePdfType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, price } = req.body;

    if (!type || (type !== "free" && type !== "paid")) {
      return res.status(400).json({ message: "Invalid PDF type" });
    }

    const updateData = {
      type,
      price: type === "paid" ? parseFloat(price) || 0 : 0,
      updatedAt: new Date().toISOString(),
    };

    const result = await adminPdfs.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.status(200).json({
      message: `PDF updated to ${type} successfully`,
      type,
      price: updateData.price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update PDF type." });
  }
};

// Delete Admin PDF
const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    if (fs.existsSync(pdf.path)) {
      fs.unlinkSync(pdf.path);
    }

    await adminPdfs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete PDF." });
  }
};
// Download PDF - ফিক্সড ভার্সন
const downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid PDF ID" });
    }

    const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Check if file exists
    if (!fs.existsSync(pdf.path)) {
      console.error(`File not found: ${pdf.path}`);
      return res.status(404).json({ message: "PDF file not found on server" });
    }

    // ফ্রি PDF - সরাসরি ডাউনলোড দিন
    if (pdf.type === "free") {
      return res.download(pdf.path, pdf.originalName);
    }

    // পেইড PDF - চেক করুন ইউজার কিনেছে কিনা
    if (pdf.type === "paid") {
      // যদি email না থাকে
      if (!email) {
        return res.status(401).json({
          message: "Please login to download paid PDFs",
        });
      }

      // চেক করুন ইউজার এই PDF টি কিনেছে কিনা (paymentStatus accepted হতে হবে)
      const purchase = await userPdfs.findOne({
        pdfId: id, // স্ট্রিং হিসেবেই রাখুন
        userEmail: email,
        paymentStatus: "accepted", // শুধু accepted স্ট্যাটাস যাদের
      });

      if (!purchase) {
        return res.status(403).json({
          message:
            "You haven't purchased this PDF yet. Please complete payment first.",
          price: pdf.price,
        });
      }

      // ডাউনলোড কাউন্ট আপডেট করুন
      await userPdfs.updateOne(
        { _id: purchase._id },
        { $inc: { downloadCount: 1 } },
      );

      // PDF ডাউনলোড করান
      return res.download(pdf.path, pdf.originalName);
    }
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Failed to download PDF" });
  }
};

// Get Free PDFs
const getFreePdfs = async (req, res) => {
  try {
    const pdfs = await adminPdfs
      .find({ type: "free" })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch free PDFs." });
  }
};

// পেমেন্ট রেকর্ড করা
const recordPdfPurchase = async (req, res) => {
  try {
    const body = req.body || {};
    const {
      pdfId,
      userEmail,
      userName,
      amount,
      paymentMethod,
      senderNumber,
      transactionId,
      receiverNumber,
      paymentType,
    } = body;

    if (!pdfId) {
      return res.status(400).json({ message: "pdfId required" });
    }

    const pdf = await adminPdfs.findOne({
      _id: new ObjectId(pdfId),
    });

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const purchaseData = {
      pdfId,
      pdfName: pdf.tittle || pdf.originalName,
      userEmail,
      userName,
      amount: parseFloat(amount) || pdf.price,
      paymentMethod,
      senderNumber,
      transactionId,
      receiverNumber,
      paymentType,
      paymentStatus: "pending",
      purchasedAt: new Date().toISOString(),
      createdAt: new Date(),
    };

    const result = await userPdfs.insertOne(purchaseData);

    res.status(201).json({
      message: "Purchase recorded successfully",
      purchaseId: result.insertedId,
      paymentStatus: "pending",
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({
      message: "Failed to record purchase",
      error: error.message,
    });
  }
};

// পেন্ডিং পেমেন্ট গেট করা
const getPendingPayments = async (req, res) => {
  try {
    const payments = await userPdfs
      .find({})
      .sort({ purchasedAt: -1 })
      .toArray();

    res.status(200).json(payments);
  } catch (error) {
    console.error("Get payments error:", error);
    res.status(500).json({
      message: "Failed to fetch payments",
    });
  }
};

// পেমেন্ট ভেরিফাই করা (Accept/Reject)
const verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // আইডি ভ্যালিড কিনা চেক করুন
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid payment ID format",
      });
    }

    // স্টেটাস ভ্যালিড কিনা চেক করুন
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be 'accepted' or 'rejected'",
      });
    }

    // পেমেন্ট আপডেট করুন
    const result = await userPdfs.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          paymentStatus: status,
          verifiedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    if (!result.matchedCount) {
      return res.status(404).json({
        message: "Payment not found with this ID",
      });
    }

    // আপডেট হওয়া ডাটা ফেরত দিন
    const updatedPayment = await userPdfs.findOne({
      _id: new ObjectId(id),
    });

    res.status(200).json({
      message: `Payment ${status} successfully`,
      payment: updatedPayment,
      status: status,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};
// Get Paid PDFs
// Get Paid PDFs - ডিবাগ ভার্সন
const getPaidPdfs = async (req, res) => {
  try {
    const { email } = req.query;

    const pdfs = await adminPdfs
      .find({ type: "paid" })
      .sort({ createdAt: -1 })
      .toArray();

    // If no email, return PDFs without purchase status
    if (!email) {
      return res.status(200).json(pdfs);
    }

    // Find user's purchased PDFs with "accepted" status
    const userPurchases = await userPdfs
      .find({
        userEmail: email,
        paymentStatus: "accepted",
      })
      .toArray();

    // Create a Set of purchased PDF IDs for faster lookup
    const purchasedPdfIds = new Set(userPurchases.map((p) => p.pdfId));

    // Add isPurchased flag to each PDF
    const pdfsWithStatus = pdfs.map((pdf) => {
      const pdfIdStr = pdf._id.toString();
      const isPurchased = purchasedPdfIds.has(pdfIdStr);

      return {
        ...pdf,
        isPurchased: isPurchased,
      };
    });

    res.status(200).json(pdfsWithStatus);
  } catch (error) {
    console.error("Error in getPaidPdfs:", error);
    res.status(500).json({ message: "Failed to fetch paid PDFs." });
  }
};
// controllers/pdfPaymentController.js এ যোগ করুন

// Delete payment record
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid payment ID format",
      });
    }

    const result = await userPdfs.deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    console.error("Delete payment error:", error);
    res.status(500).json({
      message: "Failed to delete payment",
      error: error.message,
    });
  }
};
// Record PDF Purchase

// PDF এক্সেস চেক করা
const checkPdfAccess = async (req, res) => {
  try {
    const { pdfId, email } = req.query;

    if (!pdfId || !email) {
      return res.status(400).json({
        message: "pdfId and email are required",
      });
    }

    const pdf = await adminPdfs.findOne({
      _id: new ObjectId(pdfId),
    });

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    // ফ্রি PDF হলে এক্সেস দিন
    if (pdf.type === "free") {
      return res.json({
        hasAccess: true,
        isFree: true,
      });
    }

    // পেইড PDF হলে পেমেন্ট স্টেটাস চেক করুন
    const purchase = await userPdfs.findOne({
      pdfId: pdfId,
      userEmail: email,
      paymentStatus: "accepted",
    });

    res.json({
      hasAccess: !!purchase,
      price: pdf.price,
      paymentStatus: purchase?.paymentStatus || null,
    });
  } catch (error) {
    console.error("Check access error:", error);
    res.status(500).json({
      message: "Failed to check access",
      error: error.message,
    });
  }
};
// Get user's purchased PDFs (করেক্টেড ভার্সন)
const getUserPurchasedPdfs = async (req, res) => {
  try {
    const { email } = req.params;

    // email চেক করুন
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // শুধু accepted স্ট্যাটাসের পেমেন্টগুলো নিন (completed না)
    const purchases = await userPdfs
      .find({
        userEmail: email,
        paymentStatus: "accepted", // <<< এখানে "accepted" ব্যবহার করুন
      })
      .sort({ purchasedAt: -1 })
      .toArray();

    // যদি কোনো purchase না থাকে
    if (purchases.length === 0) {
      return res.status(200).json([]);
    }

    // purchase এর সাথে PDF ডিটেইলস যোগ করুন
    const purchasedPdfs = await Promise.all(
      purchases.map(async (purchase) => {
        try {
          // pdfId ভ্যালিড কিনা চেক করুন
          if (!ObjectId.isValid(purchase.pdfId)) {
            return null;
          }

          const pdf = await adminPdfs.findOne({
            _id: new ObjectId(purchase.pdfId),
          });

          if (!pdf) {
            return null;
          }

          // সম্পূর্ণ ডাটা ফরম্যাট করুন
          return {
            _id: pdf._id,
            title: pdf.tittle || pdf.originalName,
            originalName: pdf.originalName,
            description: pdf.description,
            price: purchase.amount || pdf.price,
            type: pdf.type,
            thumbnail: pdf.thumbnail || pdf.PdfThumbnil,
            isPurchased: true,
            purchaseDate: purchase.purchasedAt,
            transactionId: purchase.transactionId,
            paymentMethod: purchase.paymentMethod,
            downloadUrl: `/pdf/download/${pdf._id}?email=${email}`,
          };
        } catch (err) {
          console.error(`Error processing purchase:`, err);
          return null;
        }
      }),
    );

    // null ভ্যালুগুলো ফিল্টার আউট করুন
    const validPdfs = purchasedPdfs.filter((pdf) => pdf !== null);

    res.status(200).json(validPdfs);
  } catch (error) {
    console.error("Get user purchased PDFs error:", error);
    res.status(500).json({
      message: "Failed to fetch purchased PDFs.",
      error: error.message,
    });
  }
};

// Get payment methods - FIXED VERSION
const getPaymentMethods = async (req, res) => {
  try {
    // Find all payment methods (should be one document)
    const methods = await paymentMethods.find({}).toArray();

    if (methods.length > 0) {
      // Return the first document
      return res.status(200).json(methods[0]);
    }

    // If no methods exist, return default empty structure
    const defaultMethods = {
      bkash: { enabled: false, number: "", type: "Personal" },
      nagad: { enabled: false, number: "", type: "Personal" },
      rocket: { enabled: false, number: "", type: "Personal" },
      bank: {
        enabled: false,
        accountName: "",
        accountNumber: "",
        bankName: "",
        branchName: "",
        routingNumber: "",
      },
    };

    res.status(200).json(defaultMethods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({
      message: "Failed to fetch payment methods",
      error: error.message,
    });
  }
};

// Save/Update payment methods - FIXED VERSION
const savePaymentMethods = async (req, res) => {
  try {
    const methods = req.body;

    // Validation optional
    if (!methods.bkash || !methods.nagad || !methods.rocket || !methods.bank) {
      return res
        .status(400)
        .json({ message: "Invalid payment methods structure" });
    }

    const existing = await paymentMethods.findOne({});

    let result;
    if (existing) {
      // Strip _id before updating
      const { _id, ...methodsToUpdate } = methods;

      result = await paymentMethods.updateOne(
        { _id: new ObjectId(existing._id) },
        { $set: methodsToUpdate },
      );
    } else {
      result = await paymentMethods.insertOne(methods);
    }

    const updated = await paymentMethods.findOne({});
    res
      .status(200)
      .json({ message: "Payment methods saved successfully", data: updated });
  } catch (error) {
    console.error("Error saving payment methods:", error);
    res
      .status(500)
      .json({
        message: "Failed to save payment methods",
        error: error.message,
      });
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

    const pdfs = await userPdfs.find(query).sort({ createdAt: -1 }).toArray();

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
      { $set: { status } },
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: "PDF not found" });

    res.status(200).json({ message: `PDF ${status} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update PDF status." });
  }
};

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

// ================= Blank Pdf Format =================

// Admin Upload
const uploadBlankPdf = async (req, res) => {
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

    const result = await blankPdfs.insertOne(pdfData);
    res.status(201).json({ message: "PDF uploaded successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload PDF." });
  }
};

// Get All Admin PDFs
const getAllBlankPdfs = async (req, res) => {
  try {
    const pdfs = await blankPdfs.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch PDFs." });
  }
};

// Delete Admin PDF
const deleteBlankPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await blankPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    if (fs.existsSync(pdf.path)) fs.unlinkSync(pdf.path);
    await blankPdfs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete PDF." });
  }
};

// Download PDF
const downloadBlankPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await blankPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

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
  uploadBlankPdf,
  getAllBlankPdfs,
  deleteBlankPdf,
  downloadBlankPdf,

  uploadPdf,
  getAllPdfs,
  updatePdfType,
  deletePdf,
  downloadPdf,
  getFreePdfs,
  getPaidPdfs,
  recordPdfPurchase,
  checkPdfAccess,
  getUserPurchasedPdfs,
  getPaymentMethods,
  savePaymentMethods,
  verifyPayment,
  getPendingPayments,
  deletePayment,
};
