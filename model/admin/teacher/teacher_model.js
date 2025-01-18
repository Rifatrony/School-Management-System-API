const mongoose = require("mongoose");

const Teacher = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
    },

    department_id : {
        type: String,
        require: true,
    },

    nid: {
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

    number: {
        type: Number,
        require: true,
        unique: true,
    },

    salary: {
        type: Number,
        require: true,
    },


    address: {
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

    
    p_nid: {
        type: String,
        require: true,
    },

    password: {
        type: String,
    },

},
    { timestamps: {} }
);


module.exports = mongoose.model('teachers', Teacher);
