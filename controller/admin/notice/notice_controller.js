const Notice = require("../../../model/admin/notice/notice_model");

const { v4: uuidv4 } = require("uuid");

const AddNewNotice = async (req, res)=>{
    try {

        const newNotice = new Notice({
            id: uuidv4(),
            title: req.body.title,
            subtitle: req.body.subtitle,
            message: req.body.message,
        });

        await newNotice.save();

        res.status(200).json({ 
            message: `New Notice Added.`,
            notice: newNotice,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchAllNotice = async (req, res) =>{
    try {

        const notice = await Notice.find()
                .select("id title subtitle message");

        res.status(200).json({
            message: 'Success',
            notice: notice,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {AddNewNotice, fetchAllNotice}