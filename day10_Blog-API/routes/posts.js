const express =  require('express');
const router = express.Router();  //Middleware helps to get access to the req and res object
const fs = require('fs');
const Post = require('../models/Post')

//29th May
//just copied every operatn from app.js to this and app-->router changed
//To get the data
router.get('/',async(req,res)=>{
    try {
        const posts= await Post.find();
        res.status(200).json({
            message:"Posts Fetched Successfully",
            postData:posts
        })
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        }) 
    }
    
})
  
  

//To save some data
router.post('/save',async(req,res)=>{
    const postObj = {
        postTitle:req.body.ptitle,
        postDescription:req.body.pdesc,
        postAuthor:req.body.pauthor
        
    }
    try {
        const post = new Post(postObj);  //instance of Post imported and postObj is passed
        await post.save()                //we wont use write file sync
        res.status(200).json({
        message:"Post saved Successfully",
        postData:post
        })
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
})


  
//To update a particular post   
router.put("/update/:id",async(req,res)=>{
    const id = req.params.id;            //caught the id(parameter) typed in url 
    const postObj = {
        postTitle:req.body.ptitle,
        postDescription:req.body.pdesc,
        postAuthor:req.body.pauthor
    
    }
    try {
    const updatedPost = await Post.findByIdAndUpdate(id,{$set:(postObj)});

    if(updatedPost==null){
        res.status(400).json({
            message:"Post didn't update/ID not found"
        })
    }
    else{
        res.status(200).json({
            message:"Post updated successfully",
            updatedPost:updatedPost
        })
    }
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
    

})
  
  
  
//To delete some particular posts 
router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if(deletedPost==null){
            res.status(400).json({
                message:"Post didn't delete/ID not found"
            })
        }
        else{
            res.status(200).json({
                message:"Post deleted successfully"
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
    

})


//To get a particular post
router.get('/getbyid/:id',async(req,res)=>{
    const id = req.params.id;
    
    try {
        const post =  await Post.findById(id);
        if(post){
            res.status(200).json({
            message:"Post found",
            post:post
            })
        }
        else{
            res.status(400).json({
             message:"Post not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
})



//GEt a post by title
//To get a particular post
router.get('/getbytitle/:title',async(req,res)=>{
    const title = req.params.title;
    
    try {
        const post =  await Post.findOne({postTitle:title});
        if(post){
            res.status(200).json({
            message:"Post found",
            post:post
            })
        }
        else{
            res.status(400).json({
             message:"Post not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    }
})

module.exports = router;









