const express = require("express");
const checkLogin = require("../middlewear/auth_middlewear");
const { UserLogin, UserRegistration } = require("../controller/user-controller");

const router = express.Router();

router.post('/registration', UserRegistration);
router.post('/login', UserLogin);

module.exports = router;