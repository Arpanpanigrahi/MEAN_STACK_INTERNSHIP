const express = require('express')

const app = express()

//middleware 29 may
const logger = require('./middleware/logger')

const postRoutes = require('./routes/posts'); //29may  new middleware to be used

const dbConn = require('./config/db.conn');



const port = process.env.PORT || 3000

let postsData=[]

app.use(logger)  //29 may middleware

app.use(express.json());             //Middleware to accept the json data that we will provide in postman Canary

app.use('/api/post',postRoutes); //just prepending that means u have to write api/post/save....like that
dbConn();                   //for database connection

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})









//OLD CODE WITHOUT STRUCTURING

//Old code for saving data that was in app.js
//   app.post('/save',(req,res)=>{
//     console.log(req.body)
//     let postsData=[]             //Whatever data you are sending from postman is getting under tthis property  req.body
//     if(fs.existsSync('./posts.json')){                         //To check if the file exists or not
//         const postsBuffer = fs.readFileSync('./posts.json');   //read the file and store it in postsBuffer
//         if(postsBuffer.length!=0){                             //If something is there in the file
//              postsData = JSON.parse(postsBuffer);
//              const post ={
//                 ID:req.body.id,
//                 postTitle:req.body.ptitle,
//                 postDescription:req.body.pdesc,
//                 postAuthor:req.body.pauthor
//             }
//             postsData.push(post)
//             fs.writeFileSync('./posts.json',JSON.stringify(postsData))
//             res.status(201).json({
//                 message:"Post created successfully"
//             })   
//         }
//         else{
//             const post ={
//                 ID:req.body.id,
//                 postTitle:req.body.ptitle,
//                 postDescription:req.body.pdesc,
//                 postAuthor:req.body.pauthor
//             }
//             postsData.push(post)
//             fs.writeFileSync('./posts.json',JSON.stringify(postsData))
//             res.status(201).json({
//                 message:"Post created successfully"
//             })   
//         }                              
//     }
//     else{
//       const post ={
//           ID:req.body.id,
//           postTitle:req.body.ptitle,
//           postDescription:req.body.pdesc,
//           postAuthor:req.body.pauthor
//       }
//       postsData.push(post)
//       fs.writeFileSync('./posts.json',JSON.stringify(postsData))
//       res.status(201).json({
//           message:"Post created successfully"
//       })
//     }
// })

//Toreaddata
// app.get('/',(req,res)=>{
//     if(fs.existsSync('./posts.json')){                         //To check if the file exists or not
//         const postsBuffer = fs.readFileSync('./posts.json');   //read the file and store it in postsBuffer
//         if(postsBuffer.length!=0){                             //If something is there in the file
//              postsData = JSON.parse(postsBuffer);
//              res.status(200).json({
//                  message:"Data Fetched successfully",
//                  posts:postsData
//              })     
//           }
//         else{
//               res.status(200).json({
//                   message:"No posts found"
//               })     
//           }                              
//       }
//       else{
//       res.status(200).json({
//           message:"No posts found"
//       })     
//     }
    
//   })
  
  
  
  
  
//   //To update a particular post   (28th May||day-11)
//   app.put("/update/:id",(req,res)=>{
//       const id = req.params.id;            //caught the id(parameter) typed in url 
//       const postObj = {
//           ID:req.body.id,
//           postTitle:req.body.ptitle,
//           postDescription:req.body.pdesc,
//           postAuthor:req.body.pauthor
        
//       }
  
//       if(fs.existsSync('./posts.json')){
//           const postsBuffer = fs.readFileSync('./posts.json');
//           let filteredPostArray=[]
//           if(postsBuffer.length!=0){
//               const postsData = JSON.parse(postsBuffer)
//               filteredPostArray = postsData.filter((post)=>post.ID!=id)      //the ID's which are notmatching with the given param will be stored in filteredPostArray
//               if(postsData.length===filteredPostArray.length){            //if both lengths are equal then no id is matching
//                   res.status(400).json({
//                       message:"ID not found"
//                   })
//               }
//               else{
//                   filteredPostArray.push(postObj);   //as some id is matching so length of filteredPostarray is 1 less than postData & pushing the updated data from postman into the filteredPostArray
//                   fs.writeFileSync('./posts.json',JSON.stringify(filteredPostArray))
//                   res.status(400).json({
//                       message:"Post Updated Successfully"
//                   })
//               }
//           }
//           else{
//               res.status(400).json({
//                   message:"Post not found"
//               })
//           }
//       }
//       else{
//           res.status(400).json({
//               message:"Posts not found"
//           })
//       }
//   })
  
  
  
//   //To delete some particular posts (28 May | day-11)
//   app.delete('/delete/:id',(req,res)=>{
//       const id = req.params.id
  
//       if(fs.existsSync('./posts.json')){
//           const postsBuffer = fs.readFileSync('./posts.json');
//           let filteredArray = []
//           if(postsBuffer.length!=0){
//               postsData = JSON.parse(postsBuffer)
//               filteredArray = postsData.filter((post)=>post.ID!=id)
//               if(postsData.length===filteredArray.length){
//                   res.status(400).json({
//                       message:"ID not found"
//                   })
//               }
//               else{
//                   fs.writeFileSync('./posts.json',JSON.stringify(filteredArray));
//                   res.status(201).json({
//                       message:"Post Deleted Successfully"
//                   })
//               }
//           }
//           else{
//               res.status(400).json({
//                   message:"Posts not found"
//               })
//           }
//       }
//       else{
//           res.status(400).json({
//               message:"File not found"
//           })
//       }
  
//   })