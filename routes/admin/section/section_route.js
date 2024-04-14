const express = require("express");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddNewSection, fetchAllSection } = require("../../../controller/admin/section/section_controller");

const router = express.Router();

router.post('/add', checkLogin, AddNewSection);
router.get('/view-all', checkLogin, fetchAllSection);

module.exports = router;