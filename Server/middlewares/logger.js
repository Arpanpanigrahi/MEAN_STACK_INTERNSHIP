const logger = (req,res,next) =>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    let d = new Date();
    console.log(d);
    next();
}

module.exports = logger;