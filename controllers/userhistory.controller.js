const UserHistory = require('../model/userhistory.model')

exports.submitUserAction = (req, res, next) => {
  UserHistory.create(req.body, (error, data)=>{
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}


exports.updateUserAction = (req, res, next) => {
  UserHistory.create(req.body.id, (error, data)=>{
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}
