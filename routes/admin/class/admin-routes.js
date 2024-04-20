const express = require("express");
const { AddNewClass, fetchAllClass } = require("../../../controller/admin/class/class-controller");
const checkLogin = require("../../../middlewear/auth_middlewear");

const router = express.Router();

router.post('/add', checkLogin, AddNewClass);
router.get('/view-all', checkLogin, fetchAllClass);

module.exports = router;