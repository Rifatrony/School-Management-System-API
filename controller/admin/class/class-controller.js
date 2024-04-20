const Class = require("../../../model/admin/class/class_model");
const { v4: uuidv4 } = require("uuid");

const AddNewClass = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if a class with the given name already exists
        const existingClass = await Class.findOne({ name });

        if (existingClass) {
            // If a class with the same name already exists, return an error response
            return res.status(400).json({ message: 'A class with the same name already exists.' });
        }

        // Find the latest class id_int
        const latestClass = await Class.findOne({}, {}, { sort: { 'class_code': -1 } });

        let id;
        if (latestClass) {
            // If a class exists, increment the id
            id = latestClass.class_code + 1;
        } else {
            // If no class exists, start with id 1
            id = 1;
        }

        // Create a new instance of NewClass
        const newClass = new Class({
            id: uuidv4(), // This can remain as is if you need it for uniqueness but not for comparison
            class_code: id,
            name: name
        });

        await newClass.save();

        res.status(200).json({
            message: `New Class Added.`,
            class: newClass,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const fetchAllClass = async (req, res) =>{
    try {

        const classes = await Class.find().select({ _id: 0, id: 1, class_code: 1, name: 1 });

        res.status(200).json({
            message: 'Success',
            allClass: classes,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {AddNewClass, fetchAllClass}