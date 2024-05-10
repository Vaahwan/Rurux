const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    steamId : {type:String},
    streamName : {type:String, required:true},
    subjectName : {type:String, required:true, unique:true}
})

const subjectModel = mongoose.model("subjects",subjectSchema);

module.exports = {subjectModel};
