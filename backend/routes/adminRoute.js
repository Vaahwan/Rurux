const express = require('express')
const {studentModel} = require("../models/student.model");
const {streamModel} = require("../models/stream.model");
const {subjectModel} = require("../models/subject.model");
const {marksModel} = require("../models/marks.model")

const adminRoute = express.Router();

adminRoute.get('/',(req,res)=>{
    try{
        res.send("hello welcome to admin route")
    }
    catch(error){
        res.status(500).send(error)
    }
})

// add / update / delete steam

adminRoute.get('/stream',async(req,res)=>{
    try{
        console.log("entered")
        const streams = await streamModel.find() || [];
        res.send(streams)
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.post('/stream',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {streamName} = req.body;
        const doesExist = await streamModel.findOne({streamName});
        if(doesExist){
            console.log(doesExist)
            return res.send("this stream already exists");
        }
        const stream = new streamModel({streamName});
        await stream.save();
        res.send("stream added succesfully");
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.put('/stream',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {_id,streamName} = req.body;
        const updatedStream = await streamModel.updateOne({_id},{$set:{streamName:streamName}});
        res.send(updatedStream);
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.delete("/stream",async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {streamId} = req.body;
        const deletedSteam = await streamModel.findByIdAndDelete(streamId)
        res.send(deletedSteam);
    }   
    catch(error){
        res.status(500).send(error);
    }
})

// add / update / delete subject

adminRoute.get('/subject',async(req,res)=>{
    try{
        console.log("entered")
        const subjects = await subjectModel.find() || [];
        res.send(subjects)
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.post('/subject',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {streamName,subjectName} = req.body;
        const doesExist = await subjectModel.findOne({subjectName});
        if(doesExist){
            console.log(doesExist)
            return res.send("this stream already exists");
        }
        const subject = new subjectModel({streamName,subjectName});
        await subject.save();
        res.send("subject added succesfully");
    }
    catch(error){
        res.send(error);
    }
})

adminRoute.put('/subject',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {_id,streamName,subjectName} = req.body;
        const updatedSubject = await subjectModel.updateOne({_id},{$set:{streamName:streamName,subjectName:subjectName}});
        res.send(updatedSubject);
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.delete("/subject",async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {subjectId} = req.body;
        const deletedSubject = await subjectModel.findByIdAndDelete(subjectId)
        res.send(deletedSubject);
    }   
    catch(error){
        res.status(500).send(error);
    }
})

// add / update / delete marks for each students

adminRoute.get('/marks',async(req,res)=>{
    try{
        if(req.body){
            const {email} = req.body;
            const marks = await marksModel.find({email}) || [];
        }

        const marks = await marksModel.find() || [];
        res.send(marks)
    }
    catch(error){
        res.status(500).send(error)
    }
})

adminRoute.post('/progress',async(req,res)=>{
    try{
        if(!req.body){
            return res.send("there is no input")
        }

        const {email} = req.body;
        const marks = await marksModel.find({studentEmail:email}) || [];
        res.send(marks)
    }
    catch(error){
        res.status(500).send(error)
    }
})


adminRoute.post('/marks',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {studentEmail,streamName,subjectName,marks} = req.body;
        const doesExist = await marksModel.findOne({$and:[{studentEmail,subjectName,marks}]});
        if(doesExist){
            console.log(doesExist)
            return res.send("this marks already exists");
        }
        const marksObj = new marksModel({studentEmail,streamName,subjectName,marks});
        await marksObj.save();
        res.send("marks added succesfully");
    }   
    catch(error){
        res.status(500).send(error);
    }
})

adminRoute.put('/marks',async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {_id,studentEmail,streamName,subjectName,marks} = req.body;
        const updatedMarks = await marksModel.updateOne({_id},{$set:{studentEmail:studentEmail,streamName:streamName,subjectName:subjectName,marks:marks}});
        res.send(updatedMarks);
    }
    catch(error){
        res.status(500).send(error)
    }
})


adminRoute.delete("/marks",async(req,res)=>{
    try{
        console.log(req.body);
        if(!req.body){
            return res.send("there is no input");
        }
        const {marksId} = req.body;
        const deletedMarks = await marksModel.findByIdAndDelete(marksId)
        res.send(deletedMarks);
    }   
    catch(error){
        res.status(500).send(error);
    }
})

// show list of all listed students

adminRoute.get("/showStudents",async(req,res)=>{
    try{
        const allStudents = await studentModel.find();
        res.send(allStudents);
    }
    catch(error){
        res.status(500).send(error)
    }
})

module.exports = {adminRoute};