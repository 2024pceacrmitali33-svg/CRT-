const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionId: {
        type: Number,
        required: true,
        unique: true
    },

    sectionName: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    semester: Number,

    studentCount: Number

}, { collection: "Section" });

module.exports = mongoose.model("Section", sectionSchema);