const express = require('express')
const {studentModel} = require("../models/student.model");

const studentRoute = express.Router();

studentRoute.get('/',(req,res)=>{
    try{
        res.send("hello welcome to studetn route")
    }
    catch(error){
        res.status(500).send(error);
    }
})

studentRoute.post('/signup', async (req,res)=>{
    try{
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send("Request body is empty or undefined.");
        }
        const { name, email, password, stream } = req.body;
        
        const existingStudent = await studentModel.findOne({email});
        if (existingStudent) {
            return res.send("This email is already registered.");
        }

        const student = new studentModel({ name, email, password, stream });
        await student.save();
        res.send("student has been added successfully")
    }
    catch(error){
        res.status(500).send(error);
    }
})

studentRoute.post('/login',async (req,res)=>{
    try{
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send("Request body is empty or undefined.");
        }
        const {email,password} = req.body;
        const existingStudent = await studentModel.findOne({email});
        if(!existingStudent){
            res.send("this student does not exist please signup first");
        }
        if(password==existingStudent.password){
            res.send("welcome student");
        }
        else{
            res.send("password is not correct");
        }
    }
    catch(error){
        res.status(500).send(error);
    }
})

studentRoute.get('/profile',async(req,res)=>{
    try{
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send("Request body is empty or undefined.");
        }
        const {email} = req.body;
        const existingStudent = await studentModel.findOne({email});
        if(!existingStudent){
            res.send("this student does not exist please signup first");
        }
        res.send(existingStudent);
    }
    catch(error){
        res.status(500).send(error);
    }
})



// one more route need to be made
// that is my performance

module.exports = {studentRoute};