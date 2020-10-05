const UserRegistration = require('../model/userregister.model')

exports.createUser = (req, res) => {
  UserRegistration.create(req.body, (error, data) => {
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}
