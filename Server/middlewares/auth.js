const jwt = require('jsonwebtoken');
const secretKey = "ThisIsAVeryLongSecretWhichCannotBeCracked12345789";

const auth = async(req,res,next)=>{
    if(req.header("x-auth-token")){
        let token = req.header("x-auth-token");
        try{
            data = await jwt.verify(token,secretKey);
            console.log("Token Valid\n");
            console.log(data);
            next();
        }catch(err){
            res.status(401).json({
                message : "Unauthorized Request. Bad token",
                error:true
            })
        }
    }else{
        res.status(401).json({
            message : "Unauthorized Request. Token missing",
            error:true
        });
    }
}

module.exports = auth;