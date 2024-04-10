const express = require("express");
const { AddFeesCaytegory } = require("../../controller/admin/fee_controller");

const router = express.Router();

router.post('/', AddFeesCaytegory);

module.exports = router;