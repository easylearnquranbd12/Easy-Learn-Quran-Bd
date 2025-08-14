const express = require("express");
const { addPaymentMethod, getAllPaymentMethods, deletePaymentMethod } = require("../Controllers/paymentMethodController");

const router = express.Router();


router.post("/", addPaymentMethod);
router.get("/", getAllPaymentMethods);
router.delete("/:id", deletePaymentMethod); 

module.exports = router;
