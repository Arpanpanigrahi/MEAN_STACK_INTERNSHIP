const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
			lowercase:true
        },
        phone:{
            type:String,
            required:true
        },
        image:{
            type:String
        },
        type:{
            type:String
        },
        userId:{
            type: String,
            required:true
        }
    }
);

module.exports = mongoose.model("contacts", contactsSchema);