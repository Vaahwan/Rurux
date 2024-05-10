const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stream : {type: String, }
})

const studentModel = mongoose.model("students",studentSchema);

module.exports = {studentModel};
