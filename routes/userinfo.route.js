const express = require('express');
const app = express()
const userInfoExpressRoute = express.Router();

//User Schema
let userInfoController = require('../controllers/userinfo.controller');

//Get users
userInfoExpressRoute.route('/adduser').post(userInfoController.addUserSession)
userInfoExpressRoute.route('/getUserById/:id').get(userInfoController.getUserSessionById)

module.exports = userInfoExpressRoute;
 
