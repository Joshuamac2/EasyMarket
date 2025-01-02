const router = require('express').Router();
const customerServiceRoutes = require('../../../controllers/admin/websiteManagement/customerServiceController.js');

router.post('/create-customer-service', customerServiceRoutes.createCustomerService);
router.get('/get-customer-service', customerServiceRoutes.getCustomerService);
router.put('/edit-customer-service', customerServiceRoutes.editCustomerService);

module.exports = router;
