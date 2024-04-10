const mongoose = require("mongoose");


const FeeCategory = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },

    fee_type: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    class_id: {
        type: String,
        require: true,
    },

},
    { timestamps: {} }
);


module.exports = mongoose.model('Fee Category', FeeCategory);