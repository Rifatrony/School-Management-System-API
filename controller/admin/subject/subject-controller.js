const Subject = require("../../../model/admin/subject/subject_model");
const Class = require('../../../model/admin/class/class_model');
const Department = require('../../../model/admin/department/department_model');

const { v4: uuidv4 } = require("uuid");

const AddNewSubject = async (req, res)=>{
    try {

        const newSubject = new Subject({
            id: uuidv4(),
            name: req.body.name,
            class_id: req.body.class_id,
            department_id: req.body.department_id,
        });

        await newSubject.save();

        res.status(200).json({ 
            message: `New Subject Added.`,
            notice: newSubject,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchAllSubject = async (req, res) => {
    try {
        const subjects = await Subject.find();

        const subjectsWithDetails = await Promise.all(subjects.map(async subject => {
            const classDetails = await Class.findOne({ id: subject.class_id }).select("-createdAt -updatedAt -__v");

            const departmentDetails = await Department.findOne({ id: subject.department_id }).select("-createdAt -updatedAt -__v");

            return {
                id: subject.id,
                name: subject.name,
                classes: classDetails, 
                department: departmentDetails 
            };
        }));

        res.status(200).json({
            message: 'Success',
            subjects: subjectsWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {AddNewSubject, fetchAllSubject}
