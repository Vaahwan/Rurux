const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    studentEmail : {type:String, required:true},
    streamId : {type:String},
    streamName : {type:String, required:true},
    subjectId : {type:String},
    subjectName : {type:String, required:true},
    marks : {type:Number, required:true}
})

const marksModel = mongoose.model("marks",marksSchema);

module.exports = {marksModel};
