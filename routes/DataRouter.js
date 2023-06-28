
const express = require('express');
const dataController = require('../controllers/dataController');


const router = express.Router();

router.get("/", dataController.getData);
router.post("/register", dataController.registerData);
router.patch("/updatetenant", dataController.updateTenantData);
router.delete("/deletetenant", dataController.deleteTenantData);
module.exports = router;