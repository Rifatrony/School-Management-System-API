const mongoose = require("mongoose");


const StudentFee = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },

    student_id: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    date: {
        type: String,
        require: true,
    },
    
    // month: {
    //     type: String,
    //     require: true,
    // },


},
    { timestamps: {} }
);


module.exports = mongoose.model('fees', StudentFee);