const mongoose = require("mongoose");

const Student = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    roll_no: {
        type: Number,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    class_id : {
        type: Number,
        require: true,
    },

    birth_certificate_no: {
        type: Number,
        require: true,
        unique: true,
    },

    f_name: {
        type: String,
        require: true,
    },

    m_name: {
        type: String,
        require: true,
    },

    number: {
        type: Number,
        require: true,
    },

    address: {
        type: String,
        require: true,
    },

    f_nid: {
        type: String,
        require: true,
    },

    password: {
        type: String,
    },

    enroll_date: {
        type: String,
        require: true,
    },

    current_enroll_year: {
        type: String,
        require: true,
    },

},
    { timestamps: {} }
);


module.exports = mongoose.model('students', Student);
