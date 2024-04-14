const express = require("express");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddNewSubject, fetchAllSubject } = require("../../../controller/admin/subject/subject-controller");

const router = express.Router();

router.post('/add', checkLogin, AddNewSubject);
router.get('/view-all', checkLogin, fetchAllSubject);

module.exports = router;