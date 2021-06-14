const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers' 
    },
    contactName:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
})


module.exports =  mongoose.model('contacts',ContactSchema); 