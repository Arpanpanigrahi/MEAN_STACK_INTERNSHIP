const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const {any} = require('joi');
const secretKey = "blog-arpan11";


//Customer registration
exports.register = async (req,res)=>{
    const customerSchema = joi.object({
        fullName:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(18),
        pNumber:joi.string().required()
    })

    try {
        let customerFields = await customerSchema.validateAsync(req.body);
        let customer = await Customer.findOne({email:customerFields.email});
        if(!customer){
            customer = new Customer(customerFields);
            const salt = await bcrypt.genSalt(10);
            customer.password = await bcrypt.hash(customer.password,salt);
            await customer.save();
            res.status(200).json({
                message:"Customer registered successfully",
                customer
            })
        }else{
            res.status(400).json({
                message:"Customer already exists",
                customer
            })
        }
    } catch (err) {
        res.status(400).json({
            message:"Something went wrong",
            error:err
        })
    }
}




//Customer Login
exports.login = async(req,res)=>{
    const loginSchema = joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })

    try {
        const loginFields = await loginSchema.validateAsync(req.body);
        let user = await Customer.findOne({email:loginFields.email})

        if(!user){
            res.status(400).json({
                message:"Sorry,the Username/Password doesn't exist"
            })
        }else{
            const matching = await bcrypt.compare(loginFields.password,user.password);
            if(!matching){
                res.status(400).json({
                    message:"Sorry,the Username/Password doesn't exist"
                })
            }else{
                const payload = {
                    userdata:{
                        id:user._id
                    }
                }

                const token = await jwt.sign(payload,secretKey,{expiresIn:7200});
                res.status(200).json({
                    message:"You're logged in now",
                    user:{id:user._id,name:user.fullName},
                    token
                })
            }
        }
        
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
}