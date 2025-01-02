const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products/productsController');

router.get('/products', productsController.getProducts);
router.get('/products/:productId(\\d+)/:productSlug?', productsController.getProductById);
router.get('/products/category/:type', productsController.getProductsByType);
router.post('/products', productsController.createProduct);
router.put('/products/:product_id', productsController.editProduct);
router.put('/edit-products/:product_id', productsController.editStock);
router.delete('/products/:product_id', productsController.deleteProduct);

module.exports = router;
