const express = require('express');
const router = express.Router();
const { completeOrder } = require('../../controllers/orders/completeOrderController.js');

router.put('/complete-order', completeOrder);

module.exports = router;
