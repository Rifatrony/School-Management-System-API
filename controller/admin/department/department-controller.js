const Department = require("../../../model/admin/department/department_model");
const { v4: uuidv4 } = require("uuid");

const AddNewDepartment = async (req, res)=>{
    try {

        const { name } = req.body;

        // Check if a depatment with the given name already exists
        const existingDepartment = await Department.findOne({ name });

        if (existingDepartment) {
            // If a depatment with the same name already exists, return an error response
            return res.status(400).json({ message: 'A depatment with the same name already exists.' });
        }

        // // Find the latest depatment id
        // const latestDepartment = await Department.findOne({}, {}, { sort: { 'id': -1 } });

        // let id;
        // if (latestDepartment) {
        //     // If a depatment exists, increment the id
        //     id = latestDepartment.id + 1;
        // } else {
        //     // If no depatment exists, start with id 1
        //     id = 1;
        // }

        // Create a new instance of newDepartment
        const newDepartment = new Department({
            id: uuidv4(),
            name: name
        });

        await newDepartment.save();

        res.status(200).json({ 
            message: `New Department Added.`,
            depatment: newDepartment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchAllDepartment = async (req, res) =>{
    try {
        const departments = await Department.find()
            .select({ _id: 0, id: 1, name: 1 })
            .sort({ createdAt: -1 }); // Sort in descending order by createdAt field

        res.status(200).json({
            message: 'Success',
            departments: departments,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {AddNewDepartment, fetchAllDepartment}