const mongoose = require('mongoose');
const config = require('./db.config');

const dbCon = async()=>{
    try {
        await mongoose.connect(config.uri,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},()=>{
            console.log("Database Connected");
        });
    } catch(err){
        console.log(err+"\nDatabase Connection Failed\n");
    }
};

module.exports=dbCon;