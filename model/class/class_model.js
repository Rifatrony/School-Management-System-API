const mongoose = require("mongoose")

const NewClass = mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
        unique: true,
    },
},

{ timestamps: {} }

);


module.exports = mongoose.model('classes', NewClass);