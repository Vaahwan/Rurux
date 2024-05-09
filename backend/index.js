const express = require('express');

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    try{
        res.send('welcome to / route')
    }
    catch(error){
        res.status(500).send(error);
    }
})

app.listen(8000,()=>{
    console.log("server is listioning at port 8000")
})