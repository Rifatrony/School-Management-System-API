const Income = require("../../../model/admin/income/income_model");

const { v4: uuidv4 } = require("uuid");

const AddIncome = async (req, res)=>{
    try {

        const newIncome = new Income({
            id: uuidv4(),
            type: req.body.type,
            amount: Number(req.body.amount),
            note: req.body.note,
        });

        await newIncome.save();

        res.status(200).json({ 
            message: `Income Added.`,
            income: newIncome,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const fetchIncome = async (req, res) =>{
    try {

        const income = await Income.find()
        .select({ _id: 0, id: 1, type: 1, amount: 1, note: 1 });

        res.status(200).json({
            message: 'Success',
            income: income,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {AddIncome, fetchIncome, }
