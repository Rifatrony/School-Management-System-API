const About = require("../../../model/admin/about/about_model");

const { v4: uuidv4 } = require("uuid");

const AddAbout = async (req, res)=>{
    try {

        const newAbout = new About({
            id: uuidv4(),
            text: req.body.text,
        });

        await newAbout.save();

        res.status(200).json({ 
            message: `About Added.`,
            notice: newAbout,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchAbout = async (req, res) => {
    try {
        const about = await About.findOne(); // Use findOne instead of find to get a single document

        if (!about) {
            // Handle case where about is not found
            return res.status(404).json({
                message: 'About not found'
            });
        }

        res.status(200).json({
            message: 'Success',
            about: about // Return the about object directly
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {AddAbout, fetchAbout, }