const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller')

router.post("/register", UserController.RegisterUser)

router.post("/login", UserController.LoginUser)

router.post('/search', UserController.ValidUser)

module.exports=router;