// const { getAddPaymentMethodCollection } = require("../config/db");

// const addPaymentMethod = async (req, res) => {
//   const { paymentType, accountType, number } = req.body;

//   if (!paymentType || !accountType || !number) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const payment = {
//       paymentType,
//       accountType,
//       number,
//       createdAt: new Date(),
//     };

//     const collection = getAddPaymentMethodCollection(); // CALL the function
//     const result = await collection.insertOne(payment);
//     res
//       .status(201)
//       .json({ message: "Payment method added", id: result.insertedId });
//   } catch (error) {
//     console.error("Error adding payment method", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const getAllPaymentMethods = async (req, res) => {
//   try {
//     const collection = getAddPaymentMethodCollection(); // function call korte hobe
//     const payments = await collection.find().toArray();
//     res.status(200).json(payments);
//   } catch (error) {
//     console.error("Error fetching payment methods:", error);
//     res.status(500).json({ message: "Failed to fetch payment methods" });
//   }
// };

// module.exports = { addPaymentMethod, getAllPaymentMethods };



const { getAddPaymentMethodCollection } = require("../config/db");
const { ObjectId } = require("mongodb");

// ➕ Add Payment Method
const addPaymentMethod = async (req, res) => {
  const { paymentType, accountType, number } = req.body;

  if (!paymentType || !accountType || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const payment = {
      paymentType,
      accountType,
      number,
      createdAt: new Date(),
    };

    const collection = getAddPaymentMethodCollection(); // Must call the function
    const result = await collection.insertOne(payment);

    res.status(201).json({
      message: "Payment method added",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding payment method", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📥 Get All Payment Methods
const getAllPaymentMethods = async (req, res) => {
  try {
    const collection = getAddPaymentMethodCollection();
    const payments = await collection.find().toArray();

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ message: "Failed to fetch payment methods" });
  }
};

// ❌ Delete Payment Method by ID
const deletePaymentMethod = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const collection = getAddPaymentMethodCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Payment method deleted" });
    } else {
      res.status(404).json({ message: "Payment method not found" });
    }
  } catch (error) {
    console.error("Error deleting payment method", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addPaymentMethod,
  getAllPaymentMethods,
  deletePaymentMethod,
};
