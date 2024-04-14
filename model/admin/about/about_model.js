const mongoose = require("mongoose")

const About = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },

    text: {
        type: String,
        require: true,
    },

},

{ timestamps: {} }

);


module.exports = mongoose.model('about', About);