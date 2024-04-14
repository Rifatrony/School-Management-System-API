const express = require("express");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddCost, fetchCost } = require("../../../controller/admin/cost/cost_controller");

const router = express.Router();

router.post('/add', checkLogin, AddCost);
router.get('/view-all', checkLogin, fetchCost);

module.exports = router;