const mongoose = require("mongoose")

const NewSubject = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
    },

    class_id: {
        type: String,
        require: true,
    },

    department_id: {
        type: String,
        require: true,
    },
},

{ timestamps: {} }

);


module.exports = mongoose.model('section', NewSubject);