const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pNumber:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('customers',CustomerSchema)