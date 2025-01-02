const router = require('express').Router();
const websiteTraffic = require('../../../controllers/admin/traffic/websiteTrafficController.js');

router.get('/website-traffic', websiteTraffic.getTraffic);

module.exports = router;
