const router = require('express').Router();
const brandRoutes = require('../../../controllers/admin/websiteManagement/brandController.js');

router.post('/brand', brandRoutes.createBrand); 
router.put('/brand', brandRoutes.updateBrand); 
router.get('/get-brand', brandRoutes.getBrandAndLinks); 

module.exports = router;
