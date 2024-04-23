const Student = require("../../../model/admin/student/student");
const StudentFee = require("../../../model/admin/fees/fee_model");
const Class = require("../../../model/admin/class/class_model");
const Department = require("../../../model/admin/department/department_model");
const Section = require("../../../model/admin/section/section_model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");


const AddStudent = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const lastTwoDigitsOfYear = currentYear.toString().slice(-2);

        // Get the class code from the request parameters
        const classId = req.params.class_id;

        // Find the class corresponding to the provided class_id
        const classDetails = await Class.findOne({ id: classId });
        if (!classDetails) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        let classCode = classDetails.class_code;

        // Add leading zero if class code is less than 10
        if (classCode < 10) {
            classCode = '0' + classCode;
        }

        // Find the count of students registered in the current year and class
        const studentCount = await Student.countDocuments({
            class_id: classId
        });

        // Generate the serial part with leading zeros
        const serial = (studentCount + 1).toString().padStart(4, '0');

        // Generate the new student id using class_code and serial
        const newId = `${lastTwoDigitsOfYear}${classCode}${serial}`;
        const currentDate = new Date().toISOString().slice(0, 10);

        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            const newStudent = new Student({
                id: newId,
                roll_no: Number(serial),
                class_id: classId,
                section_id: req.body.section_id,
                department_id: req.body.department_id,
                name: req.body.name,
                birth_certificate_no: Number(req.body.birth_certificate_no),
                age: Number(req.body.age),
                gender: req.body.gender,
                f_name: req.body.f_name,
                m_name: req.body.m_name,
                number: Number(req.body.number),
                f_nid: Number(req.body.f_nid),
                address: req.body.address,
                password: hash,
                enroll_date: currentDate,
                current_enroll_year: req.body.current_enroll_year,
            });

            await newStudent.save();
            res.status(201).json({
                message: "Registration Successful",
                data: newStudent
            });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const StudentDetails = async (req, res) => {
    try {
        const studentId = req.params.student_id;

        // Fetch student details
        const student = await Student.findOne({ id: studentId }).select("id roll_no name class_id number f_name m_name");

        if (!student) {
            console.error("Student not found in database:", studentId);
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Fetch class details using the class_id obtained from the student details
        const classDetails = await Class.findOne({ id: student.class_id }).select("-createdAt -updatedAt -__v");


        if (!classDetails) {
            console.error("Class details not found for student:", studentId);
            return res.status(404).json({
                message: "Class details not found for student"
            });
        }

        // Combine student and class details
        const studentWithClassDetails = {
            id: student.id,
            roll_no: student.roll_no,
            name: student.name,
            number: student.number,
            f_name: student.f_name,
            m_name: student.m_name,
            class: classDetails // Add class details to the student object
        };

        res.status(200).json({
            message: "Student details retrieved successfully",
            data: studentWithClassDetails
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const EnrollIntoNewClass = async (req, res) => {
    try {
        // Find the student by ID
        const studentId = req.params.student_id;
        console.log("here id " + studentId);
        const student = await Student.findOne({ id: studentId })

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update student's class ID, roll number, and current enrollment year
        student.class_id = req.body.class_id;
        student.roll_no = req.body.roll_no;
        student.current_enroll_year = req.body.current_enroll_year;

        // Save the changes
        await student.save();

        // Send response
        res.status(200).json({
            message: "Successfully Enrolled Into New Class",
            data: student
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const ViewStudent = async (req, res) => {
    try {
        // Pagination parameters
        const fixedLimit = 3; // Fixed number of results per page
        const page = parseInt(req.query.page) || 1; // Current page number, default to 1 if not provided

        // Calculate skip value based on page number and fixed limit
        const skip = (page - 1) * fixedLimit;

        // Query students
        const students = await Student.find({current_enroll_year: req.params.year});

        // Calculate total available data count
        const totalStudents = students.length;

        // Query students with pagination
        const studentsOnPage = await Student.find({current_enroll_year: req.params.year})
            .skip(skip)
            .limit(fixedLimit);

        // Map each student to include class, department, and section details
        const studentsWithDetails = await Promise.all(studentsOnPage.map(async student => {
            // Fetch class details for each student
            const classDetails = await Class.findOne({ id: student.class_id }).select({_id: 0, createdAt: 0, updatedAt: 0, __v: 0});

            // Fetch department details for each student
            const departmentDetails = await Department.findOne({ id: student.department_id })
                    .select({_id: 0, createdAt: 0, updatedAt: 0, __v: 0});

            // Fetch section details for each student
            const sectionDetails = await Section.findOne({ id: student.section_id }).select({_id: 0, createdAt: 0, updatedAt: 0, __v: 0});

            // Return student details along with class, department, and section details
            return {
                id: student.id,
                name: student.name,
                class_id: student.class_id,
                roll_no: student.roll_no,
                birth_certificate_no: student.birth_certificate_no,
                age: student.age,
                gender: student.gender,
                f_name: student.f_name,
                m_name: student.m_name,
                address: student.address,
                number: student.number,
                f_nid: student.f_nid,
                current_enroll_year: student.current_enroll_year,
                enroll_date: student.enroll_date,
                class: classDetails,
                department: departmentDetails,
                section: sectionDetails 
            };
        }));

        studentsWithDetails.reverse();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalStudents / fixedLimit);

        // Send response with students including class, department, and section details, total available data count, and page number
        res.status(200).json({
            success: true,
            students: studentsWithDetails,
            pagination: {
                total: totalStudents, // Total number of available data
                totalPages: totalPages, // Total number of pages
                current_page: page, // Current page number
                // fixedLimit: fixedLimit // Fixed limit per page
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const payStudentFee = async (req, res) => {
    try {
        const { amount } = req.body;
        const student_id = req.params.student_id;

        const selectedDate = new Date();
        const monthIndex = selectedDate.getMonth();
        const date = selectedDate.getDate();
        const year = selectedDate.getFullYear();

        // console.log(year + 1);

        // const moreYear = year + 1;

        // Add leading zero to month if less than 10
        const formattedMonth = (monthIndex + 1 < 10) ? "0" + (monthIndex + 1) : (monthIndex + 1);

        // const testMonth = monthIndex + 1;

        // const formattedTestNextMonth = (testMonth + 1 < 10) ? "0" + (testMonth + 1) : (testMonth + 1);

        const fullDate = `${year}-${formattedMonth}-${date}`;
        
        // const fullDate = `${year}-${formattedMonth}-${date}`;

        // Check if fee for current month already exists for the student
        const existingFee = await StudentFee.findOne({ student_id, date: { $regex: `${year}-${formattedMonth}-\\d{2}` } });
        // const existingFee = await StudentFee.findOne({ student_id, date: { $regex: `2024-04-\\d{2}` } });

        if (existingFee) {
            return res.status(400).json({ 
                message: `Fee for ${months[monthIndex].toUpperCase()} is already paid`,
            });
        }

        const newFee = new StudentFee({
            id: uuidv4(), 
            student_id: student_id,
            amount: amount,
            date: fullDate,
        });

        await newFee.save();

        res.status(200).json({ message: `Fee payment successful.` });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
}


const showEachStudentFee = async (req, res) =>{
    try {

        const studentFee = await StudentFee.find({ student_id: req.params.student_id})
                .select("id student_id amount date");

        res.status(200).json({
            message: 'Success',
            data: studentFee,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



module.exports  = {AddStudent, StudentDetails, EnrollIntoNewClass, ViewStudent, payStudentFee, showEachStudentFee};