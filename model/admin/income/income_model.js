const mongoose = require("mongoose")

const NewIncome = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    type: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    note: {
        type: String,
    },


},

{ timestamps: {} }

);


module.exports = mongoose.model('income', NewIncome);