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
        .select({ _id: 0, id: 1, title: 1, subtitle: 1, message: 1})
                .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Success',
            notices: notice,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const fetchLatestNotices = async (req, res) => {
    try {
        const latestNotices = await Notice.find()
        .select({ _id: 0, id: 1, title: 1, subtitle: 1, message: 1})
            .sort({ createdAt: -1 }) // Sort in descending order by _id (assuming _id is the timestamp)
            .limit(5); // Limit to 5 notices

        res.status(200).json({
            message: 'Success',
            notices: latestNotices,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {AddNewNotice, fetchAllNotice, fetchLatestNotices}