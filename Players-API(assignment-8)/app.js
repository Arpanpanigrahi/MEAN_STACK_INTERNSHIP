const express = require('express');
const app = express();

const fs = require('fs')

const port = process.env.PORT || 3000

let playersData=[]

app.use(express.json());


//---------------------------------------------------------To read all the players data---------------------------------------------------------
app.get('/read',(req,res)=>{
    if(fs.existsSync('./players.json')){
        const playersBuffer = fs.readFileSync('./players.json');
        if(playersBuffer.length!=0){
            playersData = JSON.parse(playersBuffer);
            res.status(200).json({
                message:"Players data fetched successfully",
                players:playersData
            })
        }
        else{
            res.status(200).json({
                message:"No players data found"
            })
        }
    }
    else{
        res.status(200).json({
            message:"No players data found"
        })
    }
})



//----------------------------------------------------------To Create players data--------------------------------------------------------
app.post('/create',(req,res)=>{
    let playersData = []
    if(fs.existsSync('players.json')){
        const playersBuffer = fs.readFileSync('./players.json');
        if(playersBuffer.length!=0){
            playersData = JSON.parse(playersBuffer)

            const player = {
                PlayerName:req.body.pname,
                Country:req.body.pcountry,
                Sport:req.body.psport,
                MatchesPlayed:req.body.pmatches,
                Achievements:req.body.pachieve
            }
            playersData.push(player)
            fs.writeFileSync('./players.json',JSON.stringify(playersData))
            res.status(201).json({
                message:"Players' detail created successfully"
            })
        }
        else{
            const player = {
                PlayerName:req.body.pname,
                Country:req.body.pcountry,
                Sport:req.body.psport,
                MatchesPlayed:req.body.pmatches,
                Achievements:req.body.pachieve
            }
            playersData.push(player)
            fs.writeFileSync('./players.json',JSON.stringify(playersData))
            res.status(201).json({
                message:"Players' detail created successfully"
            }) 
        }
    }
    else{
        const player = {
            PlayerName:req.body.pname,
            Country:req.body.pcountry,
            Sport:req.body.psport,
            MatchesPlayed:req.body.pmatches,
            Achievements:req.body.pachieve
        }
        playersData.push(player)
        fs.writeFileSync('./players.json',JSON.stringify(playersData))
        res.status(201).json({
            message:"Players' detail created successfully"
        }) 
    }
})



//----------------------------------------------------------To update stored players' data---------------------------------------------------------
app.put("/update/:pname",(req,res)=>{
    const pname = req.params.pname;
    const playerchng = {
        PlayerName:req.body.pname,
        Country:req.body.pcountry,
        Sport:req.body.psport,
        MatchesPlayed:req.body.pmatches,
        Achievements:req.body.pachieve
    }

    if(fs.existsSync('./players.json')){
        const playersBuffer = fs.readFileSync('./players.json');
        let filteredarray=[]
        if(playersBuffer.length!=0){
            playersData = JSON.parse(playersBuffer)
            filteredarray = playersData.filter((player)=>player.PlayerName!=pname)
            if(playersData.length===filteredarray.length){
                res.status(400).json({
                    message:"Player Name not found"
                })
            }
            else{
                filteredarray.push(playerchng);
                fs.writeFileSync('./players.json',JSON.stringify(filteredarray))
                res.status(400).json({
                    message:"Player details updated successfully"
                })
            }
        }
    }
    else{
        res.status(400).json({
            message:"Player Name not found"
        })
    }
    
})



//------------------------------------------------------------To delete stored data-------------------------------------------------------
app.delete("/delete/:pname",(req,res)=>{
    const pname = req.params.pname;

    if(fs.existsSync('./players.json')){
        const playersBuffer = fs.readFileSync('./players.json');
        let filteredarray=[]
        if(playersBuffer.length!=0){
            playersData = JSON.parse(playersBuffer)
            filteredarray = playersData.filter((player)=>player.PlayerName!=pname)
            if(playersData.length===filteredarray.length){
                res.status(400).json({
                    message:"Player Name not found"
                })
            }
            else{
                fs.writeFileSync('./players.json',JSON.stringify(filteredarray))
                res.status(200).json({
                    message:"Player details deleted successfully"
                })
            }
        }
        else{
            res.status(400).json({
                message:"Players data not found"
            })
        }
    }
    else{
        res.status(400).json({
            message:"Player Name not found"
        })
    }
    
})




//Confirmation of server running
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

//POSTMAN
//UPDATE AND DELETE BY NAME NOT BY ID
//npm run dev
//start something new
//HTTP Request
// BODY-->RAW-->JSON-->SAVE-->RIGHT SIDE pname.

//GET: http://localhost:3000/read
//POST:  http://localhost:3000/create
//DELETE:  http://localhost:3000/delete/PLAYER_NAME
//PUT:  http://localhost:3000/update/PLAYER_NAME