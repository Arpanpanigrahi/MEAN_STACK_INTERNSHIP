const mongoose = require('mongoose');

//This is the structure for our storing of data in database
const PostSchema = mongoose.Schema({
    postTitle:{
        type:String,
        required:true
    },
    postDescription:{
        type:String,
        required:true
    },
    postAuthor:{
        type:String,
        required:true
    }
})


module.exports =  mongoose.model('posts',PostSchema);  //here posts means the collection name in mongoDb we have used