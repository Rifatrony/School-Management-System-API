const express = require("express");
const { Registration, Login } = require("../../../controller/admin/auth/auth-controller");
const router = express.Router();

router.post("/registration", Registration);
router.post("/login", Login);

module.exports = router;
