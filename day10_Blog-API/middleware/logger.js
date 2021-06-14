const logger = (req,res,next)=>{
    console.log(req.url);
    console.log(req.method);
    const d = new Date();
    console.log(d);
    next(); ///not using this function will hold the object and nothing will
}
module.exports = logger;
//this will be logged in every request like read save etc