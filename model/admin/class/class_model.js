const mongoose = require("mongoose");

const NewClassSchema = mongoose.Schema({
    class_code: {
        type: Number,
        required: true,
    },

    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
},

{ timestamps: true }
);

module.exports = mongoose.model('Class', NewClassSchema);
