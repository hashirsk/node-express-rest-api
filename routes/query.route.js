const express = require('express');
const app = express()
const queryExpressRoute = express.Router();

//User Schema
let queryController = require('../controllers/query.controller');

//Get users
queryExpressRoute.route('/submit-question').post(queryController.submitQuestions)
queryExpressRoute.route('/getAnswers').post(queryController.getAnswers)

module.exports = queryExpressRoute;
