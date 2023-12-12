const mongoose = require("mongoose");
const connectDB = async (databaseURI) => {
    try {
        await mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
};
module.exports = connectDB;