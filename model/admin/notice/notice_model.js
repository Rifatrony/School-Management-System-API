const mongoose = require("mongoose")

const NewNotice = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    title: {
        type: String,
        require: true,
        unique: true,
    },

    subtitle: {
        type: String,
        require: true,
        unique: true,
    },

    message: {
        type: String,
        require: true,
        unique: true,
    },
},

{ timestamps: {} }

);


module.exports = mongoose.model('notice', NewNotice);