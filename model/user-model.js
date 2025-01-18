const mongoose = require("mongoose")

const User = mongoose.Schema({

    id: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

},

{ timestamps: {} }

);

module.exports = mongoose.model('users', User);

