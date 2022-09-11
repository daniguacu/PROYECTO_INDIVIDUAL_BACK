
const express = require('express');
const propertyController = require('../controllers/propertyController');


const router = express.Router();


router.post("/add", propertyController.addProperty);
router.get("/propertyId",propertyController.getPropertiesbyId)
router.get("/",propertyController.getProperties)
router.patch("/:propertyId", propertyController.updateProperty);
router.delete("/:propertyId", propertyController.deleteProperty);
module.exports = router;