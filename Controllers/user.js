const User = require('../Models/user')
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.myaccount = async(req,res) => {
    try{
        const id = req.params.id
        const dataUser = await User.findOne({_id:id}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
      
    }
}

exports.list = async(req,res) => {
    try{
        const dataUser = await User.find({}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
 }

 exports.register = async(req,res) => {
    try{
        const {username , password, fullname} = req.body 
        const dataUser = await User.findOne({username}).exec();
        if (dataUser) {
            return res.send('This username already exists.')
        }
        res.send(dataUser);
        const salt = await bcrypt.genSalt(600);
        let newUser = User({
            username,
            password,
            fullname
        })
        newUser.password = await bcrypt.hash(password,salt);
        let add = await newUser.save();
        if(add) {
            return res.send('Success');
        } else {
            return res.send('ERR');
        }
        
    } catch(Err) {
        return res.status(500).send('Server Error');
      
    }
 }

 exports.update = async(req,res) => {
    try{
        const id = req.params.id
        const dataUser = await User.findOneAndUpdate({_id:id},req.body,{new:true}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
 }

 exports.del = async(req,res) => {
    try{
        const id = req.params.id
        const dataUser = await User.findOneAndDelete({_id:id},req.body,{new:true}).exec();
        res.send(dataUser);
    } catch(Err) {
        res.status(500).send('Server Error');
    }
 }


 exports.login = async(req,res) => {
    try{
        const {username , password} = req.body 
        const dataUser = await User.findOne({username:username}).exec();
        if(dataUser){
            const isMatch = await bcrypt.compare(password,dataUser.password);
            if(isMatch) {
                const dataLogin = {
                    username:username
                }
                jwt.sign(dataLogin,'jwtsecret',{expiresIn:10},(err,token)=>{
                    if(err) throw err;
                    res.json({token,dataLogin});
                })
            }
        } else {
            res.status(500).send('Username or Password Invalid!');
        }
    } catch(Err) {
        res.status(500).send('Server Error');
      
    }
 }