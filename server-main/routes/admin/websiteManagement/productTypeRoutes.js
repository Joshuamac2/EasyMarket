const router = require('express').Router();
const productTypeRoutes = require('../../../controllers/admin/websiteManagement/productTypeController.js')

router.post('/product-types', productTypeRoutes.createProductType);
router.get('/product-types', productTypeRoutes.getProductType);
router.delete('/product-types/:id', productTypeRoutes.deleteProductType);
router.patch('/product-types/:id/status', productTypeRoutes.toggleProductTypeStatus);

module.exports = router;
