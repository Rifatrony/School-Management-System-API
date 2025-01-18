const express = require("express");
const { TeacherLogin, TeacherProfile } = require("../../controller/teacher/teacher_controller");
const checkLogin = require("../../middlewear/auth_middlewear");

const router = express.Router();

router.post('/login', TeacherLogin);
router.get('/profile', checkLogin , TeacherProfile);
// router.get('/view', fetchAbout);

module.exports = router;