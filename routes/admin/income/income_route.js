const express = require("express");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddIncome, fetchIncome } = require("../../../controller/admin/income/income_controller");

const router = express.Router();

router.post('/add', checkLogin, AddIncome);
router.get('/view-all', checkLogin, fetchIncome);

module.exports = router;