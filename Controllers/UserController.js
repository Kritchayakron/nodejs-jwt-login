const User = require('../Models/user')
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserController {
    // Create
    static async create(req, res) {
        //console.log(req.body);
        try{
            const {username , password, fullname} = req.body 
            
            const dataUser = await User.findOne({username}).exec();
           
            if (dataUser) {
                return res.json({ status: 'Failed', message: 'This username already exists.' });
            }
            const salt = await bcrypt.genSalt(10);
            let newUser = User({
                username,
                password,
                fullname
            })
           
            newUser.password = await bcrypt.hash(password,salt);
            let add = await newUser.save();
            
            if(add) {
                return res.json({ status: 'Success', message: 'User created successfully' });

            } else {
                return res.json({ status: 'Failed', message: 'Invalid User' });

            }
            
        } catch(Err) {
            return res.status(500).json({ status: 'Failed', message: 'Server Error' });
        
        }
    }
  
    // Read
    static async getUser(req, res) {
      try{
            const id = req.params.id
            const dataUser = await User.findOne({_id:id}).exec();
            res.send(dataUser);
        } catch(Err) {
            res.status(500).send('Server Error');
            
        }
    }
  
    // Update
    static async update(req, res) {
        try{
            const id = req.params.id
            const dataUser = await User.findOneAndUpdate({_id:id},req.body,{new:true}).exec();
            res.send(dataUser);
        } catch(Err) {
            res.status(500).send('Server Error');
        }
    }
  
    // Delete
    static async delete(req, res) {
        try{
            const id = req.params.id
            const dataUser = await User.findOneAndDelete({_id:id},req.body,{new:true}).exec();
            res.send(dataUser);
        } catch(Err) {
            res.status(500).send('Server Error');
        }
    }

    static async Login(req, res) {
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
    static async allUsers(req, res) {
        try{
            const dataUser = await User.find({}).exec();
            res.send(dataUser);
        } catch(Err) {
            res.status(500).send('Server Error');
        }

    }

  }
  
  module.exports = UserController;


