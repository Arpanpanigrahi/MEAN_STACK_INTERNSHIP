const mongoose = require('mongoose');
const config = require('./db.config');
//console.log(config.uri);

const dbConn = async()=>{
    await mongoose.connect(config.uri,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Connected to Database');
    })
}

module.exports = dbConn;