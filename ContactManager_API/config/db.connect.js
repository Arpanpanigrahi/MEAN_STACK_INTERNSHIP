const config = require('./db.config');
const mongoose = require('mongoose');

const dbConn = async()=>{
   try{ await mongoose.connect(config.uri,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Connected to ContactManager database');
    })
}
catch(err){

    console.log(err);
}
}
module.exports = dbConn; 