const express = require("express");
const { AddNewClass, fetchAllClass } = require("../../../controller/admin/class/class-controller");

const router = express.Router();

router.post('/add', AddNewClass);
router.get('/view-all', fetchAllClass);

module.exports = router;