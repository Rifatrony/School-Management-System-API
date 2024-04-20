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
        type: String,
        require: true,
    },

    section_id : {
        type: String,
        require: true,
    },

    department_id : {
        type: String,
        require: true,
    },

    birth_certificate_no: {
        type: Number,
        require: true,
        unique: true,
    },

    age: {
        type: Number,
        require: true,
    },

    gender: {
        type: String,
        require: true,
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
        default: '12345678'
    },

    enroll_date: {
        type: Date,
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
