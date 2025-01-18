const Teacher = require("../../model/admin/teacher/teacher_model");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");


const TeacherLogin = async (req, res) => {
    try {
        const number = req.body.number;
        const password = req.body.password;
        const teacher = await Teacher.findOne({ number: number });

        if (teacher) {
            bcrypt.compare(password, teacher.password, async function (err, result) {
                if (result === true) {
                    const token = jwt.sign({
                        number: teacher.number,
                        id: teacher.id,
                    }, process.env.JWT_SECRET);
                    res.status(200).json({
                        "message": "Teacher Login Successful",
                        "teacher_access_token": token,
                    });
                } else {
                    // Incorrect password
                    res.status(200).json({
                        "message": "Incorrect password",
                    });
                }
            });
        } else {
            // Email not found
            res.status(200).json({
                "message": "Email not found",
            });
        }
    } catch (error) {
        // Other errors
        res.status(500).json({
            "message": error.message,
        });
    }
};

const TeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.id });

        if (!teacher) {
            return res.status(404).json({
                message: 'Teacher not found',
            });
        }

        res.status(200).json({
            message: "Success",
            teacher: teacher,
        });
        
    } catch (error) {
        res.status(500).json({
            "message": error.message,
        });
    }
}

module.exports = {TeacherLogin, TeacherProfile}
