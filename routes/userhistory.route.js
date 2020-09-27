const express = require('express');
const app = express()

const userHistoryExpressRoute = express.Router();

//User Schema
let userHistoryController = require('../controllers/userhistory.controller');

//Get users
userHistoryExpressRoute.route('/putlog').put(userHistoryController.submitUserAction)

module.exports = userHistoryExpressRoute;
