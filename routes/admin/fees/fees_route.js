const express = require("express");
const { AddFeesCaytegory } = require("../../../controller/admin/fees/fee_controller");

const router = express.Router();

router.post('/', AddFeesCaytegory);

module.exports = router;