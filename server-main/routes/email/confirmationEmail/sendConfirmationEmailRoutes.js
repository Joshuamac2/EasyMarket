const express = require('express');
const router = express.Router();
const { sendConfirmationEmail } = require('../../../controllers/email/sendConfirmationEmail')

router.post('/send-confirmation-email', sendConfirmationEmail);

module.exports = router;
