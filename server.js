const express = require("express")
const config = require("./config")
const {readdirSync} = require("fs")
const morgan = require("morgan")
const cors = require("cors")
const multer = require('multer')
const bodyParser = require("body-parser")
const connectDB = require("./config/database")
const app = express()
const upload = multer()
connectDB(config.database.uri);
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit:config.server.limit}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); // Use multer to handle form-data
readdirSync('./routes/api').map((r)=>{
    app.use('/api',require('./routes/api/'+r))
});
const port = config.server.port;
const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // Specify the OpenAPI version
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Description of your API',
      },
    },
    servers:[
        {
            usl:'http//:localhost:3000',
        },
    ],
    // Paths to the API docs
    apis: ['./swagger/*.js'], // Replace with the path to your route files
}
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => console.log('Server is running!', port));