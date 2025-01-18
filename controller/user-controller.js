const { v4: uuidv4 } = require("uuid");

const User = require("../model/user-model");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserRegistration = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({
                "message": "This email is already registered"
            });
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                const user = new User({
                    id: uuidv4(),
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    password: hash,
                });

                console.log(user);
                
                await user.save();
                res.status(200).json({
                    'Status': 200,
                    "message": "Registration Successful",
                    data: user,
                });
            });
        }


    } catch (error) {
        res.status(500).json({
            status: "500",
            message: error.message
        });
    }
}

const UserLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });

        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result === true) {
                    if(user.role == "Admin"){
                        const token = jwt.sign({
                            email: user.email,
                            id: user.id,
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            "message": "Login Successful",
                            "admin_access_token": token,
                            "role": user.role,
                        });
    
                        console.log(user.role);
                    } 
                    else if(user.role == "Teacher"){
                        const token = jwt.sign({
                            email: user.email,
                            id: user.id,
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            "message": "Login Successful",
                            "teacher_access_token": token,
                            "role": user.role,
                        });
    
                        console.log(user.role);
                    }

                    else if(user.role == "Accountant"){
                        const token = jwt.sign({
                            email: user.email,
                            id: user.id,
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            "message": "Login Successful",
                            "accountant_access_token": token,
                            "role": user.role,
                        });
    
                        console.log(user.role);
                    }

                    else if(user.role == "Student"){
                        const token = jwt.sign({
                            email: user.email,
                            id: user.id,
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            "message": "Login Successful",
                            "student_access_token": token,
                            "role": user.role,
                        });
    
                        console.log(user.role);
                    }

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

module.exports = { UserRegistration, UserLogin, };

