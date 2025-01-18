const mongoose = require("mongoose");

const AssignClassSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: String,
        required: true,
    },
    class_id: {
        type: String,
        required: true,
    },
    section_id: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    class_day: {
        type: String,
        required: true,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    class_start_time: {
        type: String,
        required: true,
    },
    class_end_time: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('AssignClass', AssignClassSchema);
