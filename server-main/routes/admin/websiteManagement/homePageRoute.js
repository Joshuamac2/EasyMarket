const router = require('express').Router();
const homePageRoutes = require('../../../controllers/admin/websiteManagement/homePageController.js');

router.post('/create-homePage', homePageRoutes.createHomePage);
router.get('/get-homePage', homePageRoutes.getHomePage);
router.put('/edit-homePage', homePageRoutes.editHomePage);

module.exports = router;
