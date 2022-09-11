
const express = require('express');
const tenantController = require('../controllers/tenantController');


const router = express.Router();


router.post("/add", tenantController.registerTenant);
router.get("/",tenantController.getTenants)


module.exports = router;