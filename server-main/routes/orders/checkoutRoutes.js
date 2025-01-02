const express = require("express");
const checkoutController = require("../../controllers/orders/checkoutController");
const router = express.Router();

router.post("/", checkoutController.createCheckoutSession);
router.get(
  "/checkout-session",
  checkoutController.handleCheckoutSessionSuccess
);

module.exports = router;
