const FeeCategory = require("../../../model/admin/fees/fee_model");
const { v4: uuidv4 } = require("uuid");

const AddFeesCaytegory = async (req, res)=>{
    try {

        // Create a new instance of NewClass
        const newFeesCategory = new FeeCategory({
            id: uuidv4(),
            amount: Number(req.body.amount),
            fee_type: req.body.fee_type,
            class_id: req.body.class_id,
        });

        await newFeesCategory.save();

        res.status(200).json({ 
            message: `New Fees Category Added.`,
            data: newFeesCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {AddFeesCaytegory}