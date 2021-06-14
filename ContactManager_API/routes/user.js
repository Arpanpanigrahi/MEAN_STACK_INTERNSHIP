
 const express = require('express');
 const routes = express.Router();
 const customerController = require('../controllers/customer.controller');
 routes.post('/register',customerController.register);
 routes.post('/login',customerController.login);

 module.exports = routes;