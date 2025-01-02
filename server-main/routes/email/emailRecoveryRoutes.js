const express = require('express');
const router = express.Router();
const emailRecoveryController = require('../../controllers/email/emailRecoveryController');

router.post('/send-recovery-email', emailRecoveryController.sendEmail);

module.exports = router;