const express = require("express")
require('dotenv').config();
const port = process.env.PORT || 3000;
const {readdirSync} = require("fs")
const morgan = require("morgan")
const cors = require("cors")
const bodyParse = require("body-parser")
const connectDB = require("./Config/db")
const app = express()
connectDB();
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))
readdirSync('./Routes').map((r)=>{
    app.use('/api',require('./Routes/'+r))
});
app.listen(port,()=>console.log('Server is running!',port))