const Cost = require("../../../model/admin/cost/cost_model");

const { v4: uuidv4 } = require("uuid");

const AddCost = async (req, res)=>{
    try {

        const newCost = new Cost({
            id: uuidv4(),
            type: req.body.type,
            amount: Number(req.body.amount),
            note: req.body.note,
        });

        await newCost.save();

        res.status(200).json({ 
            message: `Cost Added.`,
            cost: newCost,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchCost = async (req, res) =>{
    try {

        const cost = await Cost.find().select({ _id: 0, id: 1, type: 1, amount: 1, note: 1 }).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Success',
            cost: cost,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {AddCost, fetchCost, }
