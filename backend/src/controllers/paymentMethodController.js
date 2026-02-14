const {
  getAddPaymentMethodCollection,
  getUserPaymentCollection,
} = require("../config/db");
const { ObjectId } = require("mongodb");

// ➕ Add Payment Method
const addPaymentMethod = async (req, res) => {
  const { paymentType, accountType, number, amount } = req.body;

  if (!paymentType || !accountType || !number || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const payment = {
      paymentType,
      accountType,
      amount,
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

// ========================== 🧾 USER PAYMENT SECTION ==========================

// 🧍 User submits a payment proof
// const addUserPayment = async (req, res) => {
//   const {
//     userName,
//     userEmail,
//     paymentMethod,
//     userPaymentMethod,
//     transactionId,
//   } = req.body;

//   if (!userName || !paymentMethod || !userPaymentMethod || !transactionId) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const collection = getUserPaymentCollection();

//     const paymentData = {
//       userName,
//       userEmail,
//       paymentMethod,
//       userPaymentMethod,
//       transactionId,
//       status: "pending", // default
//       createdAt: new Date(),
//       validTill: null, // will set only if accepted
//     };

//     const result = await collection.insertOne(paymentData);

//     res.status(201).json({
//       message: "Payment submitted successfully",
//       id: result.insertedId,
//       status: "pending",
//     });
//   } catch (error) {
//     console.error("Error submitting user payment:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 🧾 Admin gets all user payments
// const getAllUserPayments = async (req, res) => {
//   try {
//     const collection = getUserPaymentCollection();
//     const payments = await collection.find().sort({ createdAt: -1 }).toArray();
//     res.status(200).json(payments);
//   } catch (error) {
//     console.error("Error fetching user payments:", error);
//     res.status(500).json({ message: "Failed to fetch user payments" });
//   }
// };

// // ✅ Admin approves or rejects a payment
// const updateUserPaymentStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body; // accepted / rejected

//   if (!ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid ID" });
//   }

//   if (!["accepted", "rejected"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const collection = getUserPaymentCollection();

//     let updateDoc = { $set: { status } };

//     // if accepted → give 30 days access
//     if (status === "accepted") {
//       const validTill = new Date();
//       validTill.setDate(validTill.getDate() + 30);
//       updateDoc.$set.validTill = validTill;
//     }

//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       updateDoc
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     res.status(200).json({ message: `Payment ${status} successfully` });
//   } catch (error) {
//     console.error("Error updating payment status:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 🕒 Auto expire access after 30 days
// const autoExpirePayments = async () => {
//   try {
//     const collection = getUserPaymentCollection();

//     const now = new Date();
//     const result = await collection.updateMany(
//       { status: "accepted", validTill: { $lt: now } },
//       { $set: { status: "expired" } }
//     );

//     if (result.modifiedCount > 0) {
//       console.log(`⏰ ${result.modifiedCount} user access expired`);
//     }
//   } catch (error) {
//     console.error("Error auto-expiring payments:", error);
//   }
// };

// // Run auto expire every 1 day
// setInterval(autoExpirePayments, 24 * 60 * 60 * 1000);

// 🟢 Add User Payment (pending by default)
const addUserPayment = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      paymentMethod,
      userPaymentMethod,
      transactionId,
      amount,
      adminNumber,
    } = req.body;

    // Validation
    if (
      !userName ||
      !userEmail ||
      !paymentMethod ||
      !userPaymentMethod ||
      !transactionId ||
      !amount ||
      !adminNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const collection = getUserPaymentCollection();

    // default pending — no expire date yet
    const payment = {
      userName,
      userEmail,
      paymentMethod,
      userPaymentMethod,
      transactionId,
      amount,
      adminNumber,
      status: "pending",
      createdAt: new Date(),
      approvedAt: null,
      expireAt: null,
    };

    const result = await collection.insertOne(payment);

    res.status(201).json({
      message: "Payment submitted successfully, waiting for admin approval",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding user payment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📥 Get All Payments (Admin)
const getAllUserPayments = async (req, res) => {
  try {
    const collection = getUserPaymentCollection();
    const payments = await collection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// ✅ Update Payment Status (Admin accept/reject)
const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expected: accepted / rejected

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const collection = getUserPaymentCollection();

    // যদি admin accept করে → approvedAt = now, expireAt = now + 30 days
    let updateFields = { status, updatedAt: new Date() };

    if (status === "accepted") {
      const approvedAt = new Date();
      const expireAt = new Date();
      expireAt.setDate(approvedAt.getDate() + 30);

      updateFields = {
        ...updateFields,
        approvedAt,
        expireAt,
      };
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({
      message:
        status === "accepted"
          ? "✅ Payment accepted — 30-day access granted"
          : "🚫 Payment rejected successfully",
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 Auto delete expired payments (Optional cleanup)
const removeExpiredPayments = async () => {
  try {
    const collection = getUserPaymentCollection();
    const now = new Date();
    await collection.deleteMany({
      expireAt: { $lt: now },
      status: "accepted",
    });
    console.log("🕒 Expired payments removed successfully");
  } catch (error) {
    console.error("Error removing expired payments:", error);
  }
};

// ❌ Delete Payment (Admin)
const deleteUserPayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Payment ID" });
    }

    const collection = getUserPaymentCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "🗑️ Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Failed to delete payment" });
  }
};

// get single user payment email
// 📥 Get payments of a specific user
const getUserPaymentsByEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = id;
    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }

    const collection = getUserPaymentCollection();
    const payments = await collection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

module.exports = {
  addPaymentMethod,
  getAllPaymentMethods,
  deletePaymentMethod,
  addUserPayment,
  getAllUserPayments,
  updatePaymentStatus,
  removeExpiredPayments,
  deleteUserPayment,
  getUserPaymentsByEmail,
};
