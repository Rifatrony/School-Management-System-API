const express = require("express");
const { AddNewDepartment, fetchAllDepartment } = require("../../../controller/admin/department/department-controller");
const checkLogin = require("../../../middlewear/auth_middlewear");

const router = express.Router();

router.post('/add', checkLogin, AddNewDepartment);
router.get('/view-all', checkLogin, fetchAllDepartment);

module.exports = router;