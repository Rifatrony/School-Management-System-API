const express = require("express");

const router = express.Router();
// const {AddStudent, ViewStudent, payStudentFee, showEachStudentFee, EnrollIntoNewClass, StudentDetails} = require("../../../controller/admin/student/student_controller");
const checkLogin = require("../../../middlewear/auth_middlewear");
const { AddTeacher, ViewTeacher, assignClass } = require("../../../controller/admin/teacher/teacher_controller");

router.post('/add',checkLogin, AddTeacher);
router.get('/view-all',checkLogin, ViewTeacher);
router.post('/assign',checkLogin, assignClass);



module.exports = router;

