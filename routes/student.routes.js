const express = require('express');
const app = express()
//Express route
const studentExpressRoute = express.Router();

//User Schema
let studentController = require('../controllers/student.controller');

//Get users
studentExpressRoute.route('/').get(studentController.getUsers)
studentExpressRoute.route('/create-student').post(studentController.createStudent)
studentExpressRoute.route('/student/:id').get(studentController.getStudentById)
studentExpressRoute.route('/delete-student/:id').delete(studentController.deleteStudent)
studentExpressRoute.route('/update-student/:id').put(studentController.updateStudent)

module.exports = studentExpressRoute;
