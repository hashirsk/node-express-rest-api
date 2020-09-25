const StudentSchema = require('../model/student.model');

//get users
exports.getUsers = (req, res) => {
  StudentSchema.find((error, data) => {
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}

// create User
exports.createStudent = (req, res, next) => {
  StudentSchema.create(req.body, (error, data) => {
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}

//get single user
exports.getStudentById = (req, res) => {
  StudentSchema.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}

//update a student
exports.updateStudent = (req, res, next) => {
  studentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
  })
}

//delete a student
exports.deleteStudent = (req, res) => {
  StudentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
  })
}
