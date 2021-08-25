const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const secretKey = "ThisIsAVeryLongSecretWhichCannotBeCracked12345789";

const RegisterUser = async(req,res)=>{
    const RegisterSchema = joi.object({
        fullName : joi.string().required().min(3),
        email : joi.string().email().required(),
        password : joi.string().required().min(6).max(20)
    })
    try {
        //console.log(req.body)
        let userFields = await RegisterSchema.validateAsync(req.body);
        let userData = await User.findOne({ email: userFields.email.toLowerCase() });
        //console.log(userData);
        if(!userData){
            let newUser = new User(userFields);
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();
            res.status(201).json({
                message:"User Registration Successful",
                user: newUser,
                check:false
            })
        } else {
            res.status(400).json({
                message:"User already exists",
                check:true
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Something went wrong",
            error:err,
            check:true
        })
    }

}

const LoginUser = async(req,res)=>{
    const LoginSchema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required().min(6).max(20)
    })
    try {
        let userFields = await LoginSchema.validateAsync(req.body);
        let userData = await User.findOne({
            email:userFields.email.toLowerCase()
        });
        if(userData){
            let isMatched = await bcrypt.compare(userFields.password, userData.password);
            //console.log(userFields.password);
            //console.log(userData.password);
            //console.log(isMatched);
            if(!isMatched){
                res.status(400).json({
                    message:"Wrong Email or Password",
                    check:true
                })
            } else{
                const payload = {
                    user:{
                        id:userData._id,
                    }
                }
                const token = jwt.sign(payload, secretKey, {expiresIn:7200});
                res.status(200).json({
                    message:"User Found",
                    user:{
                        id: userData._id,
                        email: userData.email,
                        fullName: userData.fullName,
                    },
                    token: token
                })
            }
        }
        else{
            res.status(400).json({
                message:"Wrong Email or Password",
                check:true
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Something went wrong",
            check:true
        })
    }
}

const ValidUser = async(req, res)=>{
    let emailSchema = joi.object({
        email: joi.string().email().required()
    })
    try{
        let userEmail = await emailSchema.validateAsync(req.body);

        let userData = await User.find({ email: userEmail.email.toLowerCase() });
        console.log(userData)
        if(userData.length > 0){
            res.status(200).json(
                {
                    message: "User already exists",
                    check:true
                }
            )
        } else {
            res.status(200).json(
                {
                    message: "User can register",
                    check:false
                }
            )
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Something went wrong",
            check:true
        })
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
    ValidUser
};