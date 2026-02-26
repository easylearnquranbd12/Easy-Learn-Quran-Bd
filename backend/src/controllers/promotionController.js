const { ObjectId } = require("mongodb");
const { getPromotionCollection } = require("../config/db");

const db = getPromotionCollection(); // এখন db মানে promotions collection

// Get all promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await db.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch promotions", error: error.message });
  }
};
// create promotion
// const createPromotion = async (req, res) => {
//   try {
//     const promotionData = req.body;

//     // endDate + endTime merge করে expireAt বানাচ্ছি
//     const expireAt = new Date(`${promotionData.endDate}T${promotionData.endTime}`);

//     promotionData.expireAt = expireAt;
//     promotionData.createdAt = new Date();

//     const result = await db.insertOne(promotionData);

//     res.status(201).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create promotion", error: error.message });
//   }
// };


const createPromotion = async (req, res) => {
  try {
    const {
      title,
      description,
      startAt,
      expireAt,
      position,
      imageUrl,
      pdfUrl,
      link,
      status
    } = req.body;

    // Validate ISO date
    const startDateObj = new Date(startAt);
    const expireDateObj = new Date(expireAt);

    if (isNaN(startDateObj.getTime()) || isNaN(expireDateObj.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    if (expireDateObj <= startDateObj) {
      return res.status(400).json({ message: "Expire date must be after start date" });
    }

    const promotionData = {
      title,
      description,
      startAt: startDateObj,
      expireAt: expireDateObj,
      position,
      imageUrl,
      pdfUrl: pdfUrl || "",
      link: link || "",
      status: status || "active",
      createdAt: new Date(),
    };

    const result = await db.insertOne(promotionData);

    res.status(201).json({ success: true, data: result });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create promotion",
      error: error.message,
    });
  }
};


// Delete promotion
const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete promotion", error: error.message });
  }
};

module.exports = {
  getAllPromotions,
  createPromotion,
  deletePromotion,
};
