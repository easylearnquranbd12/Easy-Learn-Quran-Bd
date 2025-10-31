const express = require("express");
const { addPaymentMethod, getAllPaymentMethods, deletePaymentMethod, addUserPayment, getAllUserPayments, updateUserPaymentStatus, updatePaymentStatus, deleteUserPayment } = require("../Controllers/paymentMethodController");

const router = express.Router();

// payment method add routes
router.post("/", addPaymentMethod);
router.get("/", getAllPaymentMethods);
router.delete("/:id", deletePaymentMethod); 


// User submits payment
router.post("/user", addUserPayment);

// Admin fetch all payments
router.get("/admin", getAllUserPayments);
router.delete("/admin/:id", deleteUserPayment);

// Admin updates payment status
router.patch("/status/:id", updatePaymentStatus);
module.exports = router;
