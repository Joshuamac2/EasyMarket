const express = require('express');
const messagesController = require('../../controllers/email/messagesController.js');
const router = express.Router();

router.post('/', messagesController.sendMessage);

module.exports = router;
