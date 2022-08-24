
const express = require('express');
const propertyController = require('../controllers/propertyController');


const router = express.Router();


router.post("/add", propertyController.addProperty);
router.get("/:landlord",propertyController.getPropertiesbyLandlordId)

module.exports = router;