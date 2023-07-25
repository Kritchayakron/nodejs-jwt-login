const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
},{timestamps:true})
module.exports  = mongoose.model('users',userSchema);