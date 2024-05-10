const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
    streamName : {type:String, required:true, unique:true},
})

const streamModel = mongoose.model("streams",streamSchema);

module.exports = {streamModel};
