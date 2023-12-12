const User = require('../models/user')
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const config = process.env
class UserController {
    // Create
    static async create(req, res) {
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
            
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: Err });
        
        }
    }
  
    // Read
    static async getUser(req, res) {
      if(!req.params.id) {
        return res.status(400).json({ status: 'Failed', message: 'required id' });
      }

      try{
            const id = req.params.id
            const objectId = new mongoose.Types.ObjectId(id);
            const dataUser = await User.findOne({_id:objectId}).exec();
            if (!dataUser) {
                throw new Error('User not found');
            }
            return res.send(dataUser);
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        }
    }
  
    // Update
    static async update(req, res) {
        if(!req.params.id) {
            return res.status(400).json({ status: 'Failed', message: 'required id' });
        }
        try{
        
            const id = req.params.id
            const objectId = new mongoose.Types.ObjectId(id);
            const dataUser = await User.findOneAndUpdate({_id:objectId},req.body,{new:true}).exec();
            if (!dataUser) {
                throw new Error('User not found for the given id');
            }
            return res.send(dataUser);
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        }
    }
  
    // Delete
    static async delete(req, res) {
        try{
            const id = req.params.id
            const dataUser = await User.findOneAndDelete({_id:id},req.body,{new:true}).exec();
            return res.send(dataUser);
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        }
    }
    static async loginValidator(req){

    }
    static async login(req, res) {
        
        try{
            const {username , password} = req.body 
            if(!username || !password) {
                return res.status(400).json({ status: 'Failed', message: 'Bad requrest' });
            }
            const dataUser = await User.findOne({username:username}).exec();
            if(dataUser){
                const isMatch = await bcrypt.compare(password.trim(), dataUser.password.trim());
                if(isMatch) {
                    const dataLogin = {
                        username:username
                    }
                    jwt.sign(dataLogin, config.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                           // console.error(err);
                            return res.status(500).json({ status: 'Failed', message: 'Token generation failed' });
                        }
                        res.json({ token, dataLogin });
                    });
                } else {
                    return res.status(400).json({ status: 'Failed', message: 'Password not correct' });
                }
            } else {
                return res.status(400).json({ status: 'Failed', message: 'Not found user' });
            }
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: error.message });
        
        }
    }
    static async allUsers(req, res) {
        try{
            const dataUser = await User.find({}).exec();
            res.send(dataUser);
        } catch(error) {
            return res.status(500).json({ status: 'Failed', message: Err });
        }

    }

  }
  
  module.exports = UserController;


