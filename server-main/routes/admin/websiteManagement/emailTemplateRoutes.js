const router = require('express').Router();
const emailTemplateController = require('../../../controllers/email/emailTemplateController.js');

router.post('/create-email-template', emailTemplateController.createEmailTemplate);
router.put('/edit-email-template', emailTemplateController.editEmailTemplate);
router.get('/get-email-template', emailTemplateController.getEmailTemplate);

module.exports = router;
