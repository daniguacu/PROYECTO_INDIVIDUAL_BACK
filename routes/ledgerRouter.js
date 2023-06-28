
const express = require('express');
const ledgerController = require('../controllers/ledgerController');


const router = express.Router();


router.post("/addinitialbalance", ledgerController.registerinitialbalance);
router.get("/",ledgerController.getLedgers)
router.patch("/entercharge",ledgerController.enterChargebytenandId)



module.exports = router;