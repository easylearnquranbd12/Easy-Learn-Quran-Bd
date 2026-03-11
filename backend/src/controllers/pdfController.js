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

// ================= Admin =================

// // Admin Upload
// const uploadPdf = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: "No file uploaded" });

//     const pdfData = {
//       originalName: file.originalname,
//       filename: file.filename,
//       path: file.path,
//       size: file.size,
//       createdAt: new Date().toISOString(),
//     };

//     const result = await adminPdfs.insertOne(pdfData);
//     res.status(201).json({ message: "PDF uploaded successfully", result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to upload PDF." });
//   }
// };

// // Get All Admin PDFs
// const getAllPdfs = async (req, res) => {
//   try {
//     const pdfs = await adminPdfs.find().sort({ createdAt: -1 }).toArray();
//     res.status(200).json(pdfs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch PDFs." });
//   }
// };

// // Delete Admin PDF
// const deletePdf = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
//     if (!pdf) return res.status(404).json({ message: "PDF not found" });

//     if (fs.existsSync(pdf.path)) fs.unlinkSync(pdf.path);
//     await adminPdfs.deleteOne({ _id: new ObjectId(id) });
//     res.status(200).json({ message: "PDF deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete PDF." });
//   }
// };

// // Download PDF
// const downloadPdf = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
//     if (!pdf) return res.status(404).json({ message: "PDF not found" });

//     res.download(path.resolve(pdf.path), pdf.originalName);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to download PDF" });
//   }
// };


// ================= Admin =================

// Admin Upload - Updated with type and price
const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const { type, price } = req.body;

    const pdfData = {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      type: type || "free", // default to free if not specified
      price: type === "paid" ? parseFloat(price) || 0 : 0,
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
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.status(200).json({ 
      message: `PDF updated to ${type} successfully`,
      type,
      price: updateData.price
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

    if (fs.existsSync(pdf.path)) fs.unlinkSync(pdf.path);
    await adminPdfs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete PDF." });
  }
};

// Download PDF - Check if user has access (for paid PDFs)
const downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query; // Assuming userId is passed as query param

    const pdf = await adminPdfs.findOne({ _id: new ObjectId(id) });
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    // Check if PDF is paid and user has access
    if (pdf.type === "paid") {
      // Check if user has purchased this PDF
      const userAccess = await userPdfs.findOne({ 
        pdfId: id,
        userId: userId,
        paymentStatus: "completed"
      });

      if (!userAccess) {
        return res.status(403).json({ 
          message: "This is a paid PDF. Please purchase to download.",
          price: pdf.price
        });
      }
    }

    res.download(path.resolve(pdf.path), pdf.originalName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download PDF" });
  }
};

// Get Free PDFs only (for public access)
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

// Get Paid PDFs (with purchase info for specific user)
const getPaidPdfs = async (req, res) => {
  try {
    const { userId } = req.query;
    
    const pdfs = await adminPdfs
      .find({ type: "paid" })
      .sort({ createdAt: -1 })
      .toArray();

    // If userId is provided, check which PDFs the user has purchased
    if (userId) {
      const userPurchases = await userPdfs
        .find({ 
          userId: userId,
          paymentStatus: "completed" 
        })
        .toArray();

      const purchasedPdfIds = userPurchases.map(p => p.pdfId);

      // Add purchase status to each PDF
      const pdfsWithStatus = pdfs.map(pdf => ({
        ...pdf,
        isPurchased: purchasedPdfIds.includes(pdf._id.toString())
      }));

      return res.status(200).json(pdfsWithStatus);
    }

    res.status(200).json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch paid PDFs." });
  }
};

// Record PDF Purchase (when user buys a paid PDF)
const recordPdfPurchase = async (req, res) => {
  try {
    const { pdfId, userId, paymentDetails } = req.body;

    const pdf = await adminPdfs.findOne({ _id: new ObjectId(pdfId) });
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    if (pdf.type !== "paid") {
      return res.status(400).json({ message: "This PDF is not a paid item" });
    }

    const purchaseData = {
      pdfId,
      userId,
      pdfName: pdf.originalName,
      price: pdf.price,
      paymentStatus: "completed",
      paymentDetails,
      purchasedAt: new Date().toISOString()
    };

    const result = await userPdfs.insertOne(purchaseData);

    res.status(201).json({ 
      message: "Purchase recorded successfully", 
      result 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to record purchase." });
  }
};

// Check if user has access to a specific PDF
const checkPdfAccess = async (req, res) => {
  try {
    const { pdfId, userId } = req.query;

    const pdf = await adminPdfs.findOne({ _id: new ObjectId(pdfId) });
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Free PDFs are always accessible
    if (pdf.type === "free") {
      return res.status(200).json({ 
        hasAccess: true, 
        type: "free" 
      });
    }

    // Check if user has purchased the paid PDF
    const purchase = await userPdfs.findOne({ 
      pdfId: pdfId,
      userId: userId,
      paymentStatus: "completed"
    });

    res.status(200).json({ 
      hasAccess: !!purchase,
      type: "paid",
      price: pdf.price
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check PDF access." });
  }
};

// Get user's purchased PDFs
const getUserPurchasedPdfs = async (req, res) => {
  try {
    const { userId } = req.params;

    const purchases = await userPdfs
      .find({ userId, paymentStatus: "completed" })
      .sort({ purchasedAt: -1 })
      .toArray();

    // Get full PDF details for each purchase
    const purchasedPdfs = await Promise.all(
      purchases.map(async (purchase) => {
        const pdf = await adminPdfs.findOne({ 
          _id: new ObjectId(purchase.pdfId) 
        });
        return {
          ...pdf,
          purchaseDate: purchase.purchasedAt,
          price: purchase.price
        };
      })
    );

    res.status(200).json(purchasedPdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch purchased PDFs." });
  }
};

// Get payment methods
const getPaymentMethods = async (req, res) => {
  try {
    // We'll always have only one document for payment methods
    let methods = await paymentMethods.findOne({});
    
    // If no payment methods exist, return default empty structure
    if (!methods) {
      methods = {
        bkash: { enabled: false, number: "", type: "Personal" },
        nagad: { enabled: false, number: "", type: "Personal" },
        rocket: { enabled: false, number: "", type: "Personal" },
        bank: {
          enabled: false,
          accountName: "",
          accountNumber: "",
          bankName: "",
          branchName: "",
          routingNumber: ""
        }
      };
    }
    
    res.status(200).json(methods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ message: "Failed to fetch payment methods" });
  }
};

// Save/Update payment methods
const savePaymentMethods = async (req, res) => {
  try {
    const methods = req.body;
    
    // Validate the data structure
    if (!methods.bkash || !methods.nagad || !methods.rocket || !methods.bank) {
      return res.status(400).json({ message: "Invalid payment methods data structure" });
    }
    
    // Check if a document already exists
    const existing = await paymentMethods.findOne({});
    
    let result;
    if (existing) {
      // Update existing document
      result = await paymentMethods.updateOne(
        {},
        { $set: methods }
      );
    } else {
      // Insert new document
      result = await paymentMethods.insertOne(methods);
    }
    
    res.status(200).json({ 
      message: "Payment methods saved successfully",
      result 
    });
  } catch (error) {
    console.error("Error saving payment methods:", error);
    res.status(500).json({ message: "Failed to save payment methods" });
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
  savePaymentMethods

};
