const express = require("express");
const { AddAbout, fetchAbout } = require("../../../controller/admin/about/about-controller");
const checkLogin = require("../../../middlewear/auth_middlewear");

const router = express.Router();

router.post('/add', checkLogin, AddAbout);
router.get('/view', fetchAbout);

module.exports = router;