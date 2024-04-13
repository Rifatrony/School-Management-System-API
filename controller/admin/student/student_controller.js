const Student = require("../../../model/admin/student/student");
const StudentFee = require("../../../model/admin/fees/fee_model");
const Class = require("../../../model/admin/class/class_model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");


const AddStudent = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const lastTwoDigitsOfYear = currentYear.toString().slice(-2);

        // Get the class code from the request body and ensure it's two digits
        let classId = parseInt(req.params.class_id);
        if (classId < 10) {
            classId = '0' + classId;
        }

        // Find the count of students registered in the current year and class
        const studentCount = await Student.countDocuments({
            class_id: classId
        });

        // Generate the serial part with leading zeros
        const serial = (studentCount + 1).toString().padStart(4, '0');

        // Generate the new id
        const newId = lastTwoDigitsOfYear + classId + serial;
        const currentDate = new Date().toISOString().slice(0, 10);

        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            const newStudent = new Student({
                id: newId,
                name: req.body.name,
                birth_certificate_no: Number(req.body.birth_certificate_no),
                class_id: Number(classId),
                roll_no: Number(serial),
                f_name: req.body.f_name,
                f_nid: Number(req.body.f_nid),
                number: Number(req.body.number),
                m_name: req.body.m_name,
                addres: req.body.addres,
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
        const students = await Student.find();

        // Calculate total available data count
        const totalStudents = students.length;

        // Query students with pagination
        const studentsOnPage = await Student.find()
            .skip(skip)
            .limit(fixedLimit);

        // Map each student to include class details
        const studentsWithClass = await Promise.all(studentsOnPage.map(async student => {
            // Fetch class details for each student
            const classDetails = await Class.findOne({ id: student.class_id }).select("-createdAt -updatedAt -__v");

            // Return student details along with class details
            return {
                id: student.id,
                name: student.name,
                roll_no: student.roll_no,
                birth_certificate_no: student.birth_certificate_no,
                f_name: student.f_name,
                m_name: student.m_name,
                address: student.address,
                number: student.number,
                f_nid: student.f_nid,
                current_enroll_year: student.current_enroll_year,
                enroll_date: student.enroll_date,
                // Include other student details as needed
                class: classDetails // Include class details
            };
        }));

        // Calculate total number of pages
        const totalPages = Math.ceil(totalStudents / fixedLimit);

        // Send response with students including class details, total available data count, and page number
        res.status(200).json({
            success: true,
            students: studentsWithClass,
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