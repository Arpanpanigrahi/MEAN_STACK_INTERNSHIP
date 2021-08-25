const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
		lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("users", usersSchema);