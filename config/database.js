const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
 
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
       // console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
};

module.exports = connectDB;