const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
 
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
       // console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
};

module.exports = connectDB;