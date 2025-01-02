const express = require('express');
const router = express.Router();
const { getOrderDetails } = require('../../controllers/orders/getOrderDetailsController.js');

router.get('/order-details', getOrderDetails);

module.exports = router;
