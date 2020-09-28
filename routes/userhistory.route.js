const express = require('express');
const app = express()

const userHistoryExpressRoute = express.Router();

//User Schema
let userHistoryController = require('../controllers/userhistory.controller');

//Get users
userHistoryExpressRoute.route('/putlog').put(userHistoryController.submitUserAction)
userHistoryExpressRoute.route('/updatelog').put(userHistoryController.updateUserAction)

module.exports = userHistoryExpressRoute;
