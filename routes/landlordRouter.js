
const express = require('express');
const landlordController = require('../controllers/landlordController');


const router = express.Router();

router.get("/", landlordController.getLandlords);
router.post("/register", landlordController.registerLandlord);
router.patch("/:landlordId", landlordController.updateLandlord);
router.get("/:landlordId", landlordController.getLandlordbyid);
router.delete("/:landlordId", landlordController.deleteLandlord);
module.exports = router;