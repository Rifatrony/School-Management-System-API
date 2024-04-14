const Section = require("../../../model/admin/section/section_model");
const Class = require('../../../model/admin/class/class_model');
const Department = require('../../../model/admin/department/department_model');

const { v4: uuidv4 } = require("uuid");

const AddNewSection = async (req, res)=>{
    try {

        const newSection = new Section({
            id: uuidv4(),
            name: req.body.name,
            class_id: req.body.class_id,
            department_id: req.body.department_id,
        });

        await newSection.save();

        res.status(200).json({ 
            message: `New Section Added.`,
            section: newSection,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchAllSection = async (req, res) => {
    try {
        // Fetch all sections
        const sections = await Section.find();

        // Group sections by class_id
        const sectionsByClass = sections.reduce((acc, section) => {
            if (!acc[section.class_id]) {
                acc[section.class_id] = [];
            }
            acc[section.class_id].push(section);
            return acc;
        }, {});

        // Fetch class details and sections for each class
        const sectionWithDetails = await Promise.all(Object.keys(sectionsByClass).map(async classId => {
            // Fetch class details
            const classDetails = await Class.findOne({ id: classId }).select("-createdAt -updatedAt -__v");

            // Get sections for this class
            const classSections = sectionsByClass[classId].map(section => ({
                id: section.id,
                name: section.name,
                department_id: section.department_id
            }));

            // Fetch department details for each section
            const sectionsWithDepartment = await Promise.all(classSections.map(async section => {
                const departmentDetails = await Department.findOne({ id: section.department_id }).select("-createdAt -updatedAt -__v");
                return {
                    ...section,
                    department: departmentDetails
                };
            }));

            return {
                class: classDetails,
                sections: sectionsWithDepartment
            };
        }));

        res.status(200).json({
            message: 'Success',
            section: sectionWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};





module.exports = {AddNewSection, fetchAllSection}
