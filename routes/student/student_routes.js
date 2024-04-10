const express = require("express");

const router = express.Router();
const {AddStudent, ViewStudent, payStudentFee, showEachStudentFee, EnrollIntoNewClass, StudentDetails} = require("../../controller/student/student_controller");
const checkLogin = require("../../middlewear/auth_middlewear");

router.post('/add/:class_id',checkLogin, AddStudent);
router.get('/details/:student_id', checkLogin, StudentDetails);
router.get('/view/:year', checkLogin, ViewStudent);
router.post('/fee/:student_id', payStudentFee);
router.get('/fee/:student_id', showEachStudentFee);

router.put('/enroll/:student_id', checkLogin, EnrollIntoNewClass);


module.exports = router;
