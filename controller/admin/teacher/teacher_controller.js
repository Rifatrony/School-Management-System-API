const Teacher = require("../../../model/admin/teacher/teacher_model");
const AssignClass = require("../../../model/admin/class/assign_class");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");


const AddTeacher = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const lastTwoDigitsOfYear = currentYear.toString().slice(-2);
        const teacherCount = await Teacher.countDocuments();

        const serial = (teacherCount + 1).toString().padStart(4, '0');

        const newId = "T" + lastTwoDigitsOfYear + serial;

        // Check if the phone number already exists
        const existingTeacher = await Teacher.findOne({ number: Number(req.body.number) });
        if (existingTeacher) {
            return res.status(400).json({
                message: "Phone number already exists"
            });
        }

        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    message: "Error hashing password"
                });
            }

            const newTeacher = new Teacher({
                id: newId,
                name: req.body.name,
                nid: Number(req.body.nid),
                department_id: req.body.department_id,
                number: Number(req.body.number),
                salary: Number(req.body.salary),
                addres: req.body.addres,
                f_name: req.body.f_name,
                m_name: req.body.m_name,
                p_nid: Number(req.body.p_nid),
                age: Number(req.body.age),
                gender: req.body.gender,
                password: hash,
            });

            await newTeacher.save();
            res.status(200).json({
                message: "Teacher Added Successfully",
                teacher: newTeacher
            });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const ViewTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.find().select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            teachers: teacher,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const timeToMinutes = (time) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
};

const assignClass = async (req, res) => {
    try {
        const { teacher_id, class_id, section_id, year, class_day, class_start_time, class_end_time } = req.body;

        const startTimeInMinutes = timeToMinutes(class_start_time);
        const endTimeInMinutes = timeToMinutes(class_end_time);

        if (startTimeInMinutes >= endTimeInMinutes) {
            return res.status(400).json({
                message: "Class start time must be before end time"
            });
        }

        // Check for existing class assignment conflict
        const existingAssignments = await AssignClass.find({
            teacher_id: teacher_id,
            year: year,
            class_day: class_day
        });

        for (let assignment of existingAssignments) {
            const existingStartTime = timeToMinutes(assignment.class_start_time);
            const existingEndTime = timeToMinutes(assignment.class_end_time);

            if ((startTimeInMinutes < existingEndTime) && (endTimeInMinutes > existingStartTime)) {
                return res.status(400).json({
                    message: "Teacher is already assigned to another class at this time on this day in the same year."
                });
            }
        }

        // Generate new ID for the assignment
        const assignmentCount = await AssignClass.countDocuments();
        const newId = `A${(assignmentCount + 1).toString().padStart(6, '0')}`;

        const newAssignment = new AssignClass({
            id: newId,
            teacher_id: teacher_id,
            class_id: class_id,
            section_id: section_id,
            year: year,
            class_day: class_day,
            class_start_time: class_start_time,
            class_end_time: class_end_time
        });

        await newAssignment.save();
        res.status(200).json({
            message: "Class assignment added successfully",
            assignment: newAssignment
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports  = {AddTeacher, assignClass, ViewTeacher, };