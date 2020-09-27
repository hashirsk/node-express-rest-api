const userInfo = require('../model/userinfo.model')

exports.addUserSession = (req, res, next) => {
  userInfo.create(req.body, (error, data)=>{
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}

exports.getUserSessionById = (req, res, next) => {
  userInfo.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
}
