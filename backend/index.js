const express = require('express');
const {connection} = require("./config/db")
const {studentRoute} = require("./routes/studentRoute")
const {adminRoute} = require("./routes/adminRoute")
const cors = require('cors');


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/student',studentRoute);
app.use('/admin',adminRoute);

app.get('/',(req,res)=>{
    try{
        res.send('welcome to / route')
    }
    catch(error){
        res.status(500).send(error);
    }
})

app.listen(port,async()=>{
    try{
        await connection;
        console.log(`server is listioning at port ${port}`);
    }
    catch(error){
        console.log(error);
    }
    
})