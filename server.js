const express = require("express")
require('dotenv').config({ path: './env/test.env' })
const port = process.env.PORT || 3000;
const {readdirSync} = require("fs")
const morgan = require("morgan")
const cors = require("cors")
const multer = require('multer')
const bodyParser = require("body-parser")
const connectDB = require("./config/database")
const app = express()
const upload = multer();
connectDB();
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); // Use multer to handle form-data
readdirSync('./routes/api').map((r)=>{
    app.use('/api',require('./routes/api/'+r))
});
app.listen(port,()=>console.log('Server is running!',port))