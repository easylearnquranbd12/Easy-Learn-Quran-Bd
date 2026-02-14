// controllers/dashboardController.js
const { ObjectId } = require("mongodb");
const {
  getUserCollection,
  getAdminPdfUploadCollection,
  getUserPdfUploadCollection,
  // example of some layer collections for counts
  getFirstLayerVocabularyCollection,
  getSecondLayerSentenceCollection,
  getFiveLayerMcqCollection,
  getUserPaymentCollection,
} = require("../config/db");

// Summary: users, admin pdfs, user pdfs
const getSummary = async (req, res) => {
  try {
    const usersCol = getUserCollection();
    const adminPdfCol = getAdminPdfUploadCollection();
    const userPdfCol = getUserPdfUploadCollection();

    const [usersCount, adminPdfCount, userPdfCount] = await Promise.all([
      usersCol.countDocuments(),
      adminPdfCol.countDocuments(),
      userPdfCol.countDocuments(),
    ]);

    res.status(200).json({
      usersCount,
      adminPdfCount,
      userPdfCount,
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

// PDFs by status (user uploads)
const getUserPdfsByStatus = async (req, res) => {
  try {
    const userPdfCol = getUserPdfUploadCollection();
    const agg = await userPdfCol.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$status", "pending"] },
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    // convert to object map for ease
    const result = agg.map((r) => ({ status: r._id, count: r.count }));
    res.status(200).json(result);
  } catch (err) {
    console.error("getUserPdfsByStatus error:", err);
    res.status(500).json({ message: "Failed to fetch pdfs by status" });
  }
};

// Users per month (last 6 months)
// Users per month (last 6 months)
const getUsersByMonth = async (req, res) => {
  try {
    const usersCol = getUserCollection();
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const agg = await usersCol.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo.toISOString ? sixMonthsAgo.toISOString() : sixMonthsAgo },
        },
      },
      {
        $addFields: {
          createdAtDate: {
            $cond: [
              { $eq: [{ $type: "$createdAt" }, "string"] }, // <-- এখানে $isString পরিবর্তন করে $type ব্যবহার
              { $toDate: "$createdAt" },
              "$createdAt",
            ],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$createdAtDate" }, month: { $month: "$createdAtDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]).toArray();

    // Normalize to last 6 months labels
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString("default", { month: "short", year: "numeric" }) });
    }

    const data = months.map((m) => {
      const found = agg.find((a) => a._id.year === m.year && a._id.month === m.month);
      return { label: m.label, count: found ? found.count : 0 };
    });

    res.status(200).json(data);
  } catch (err) {
    console.error("getUsersByMonth error:", err);
    res.status(500).json({ message: "Failed to fetch users by month" });
  }
};

// Top collections counts (example layers)
const getTopCollections = async (req, res) => {
  try {
    const c1 = getFirstLayerVocabularyCollection();
    const c2 = getSecondLayerSentenceCollection();
    const c3 = getFiveLayerMcqCollection();

    const [c1Count, c2Count, c3Count] = await Promise.all([
      c1.countDocuments(),
      c2.countDocuments(),
      c3.countDocuments(),
    ]);

    res.status(200).json([
      { name: "Vocabulary", count: c1Count },
      { name: "Sentence", count: c2Count },
      { name: "MCQ", count: c3Count },
    ]);
  } catch (err) {
    console.error("getTopCollections error:", err);
    res.status(500).json({ message: "Failed to fetch collections counts" });
  }
};

// User Dashboard Summary
const getUserDashboardSummary = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Email required" });

    const pdfCollection = getUserPdfUploadCollection();
    const paymentCollection = getUserPaymentCollection();

    // PDFs count by status
    const pdfStats = await pdfCollection
      .aggregate([
        { $match: { email } }, // PDFs এর email
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ])
      .toArray();

    // Payments count by status
    const paymentStats = await paymentCollection
      .aggregate([
        { $match: { userEmail: email } }, // Payments collection এ userEmail
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ])
      .toArray();

    // Total counts
    const totalPdfs = pdfStats.reduce((sum, i) => sum + i.count, 0);
    const totalPayments = paymentStats.reduce((sum, i) => sum + i.count, 0);

    res.status(200).json({
      pdfStats,
      paymentStats,
      totalPdfs,
      totalPayments,
    });
  } catch (err) {
    console.error("Error loading user dashboard summary:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSummary,
  getUserPdfsByStatus,
  getUsersByMonth,
  getTopCollections,
  getUserDashboardSummary
};
