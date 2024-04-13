const mongoose = require("mongoose")

const NewDepartment = mongoose.Schema({
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


module.exports = mongoose.model('department', NewDepartment);