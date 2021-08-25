const port = process.env.PORT || 3000;
const dbCon = require("./config/db.con");
const logger = require("./middlewares/logger");
const usersRoutes = require("./routes/usersRouter");
const contactsRoutes = require("./routes/contactsRouter");
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

let corsOption = {
    "origin":"*"
};

app.use(cors(corsOption));
app.use(express.json());
app.use(logger);
app.use('/uploads', express.static('uploads'));
app.use('/api/users/', usersRoutes);
app.use('/api/contacts/', contactsRoutes);
dbCon();
app.get('/uploads/:filename', function(req, res){
    let options = {
        root: path.join(__dirname + '/uploads/')
    };
      
    let fileName = req.params.filename;
	console.log(fileName + path)
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});


app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});
