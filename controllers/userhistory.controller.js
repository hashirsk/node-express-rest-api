const common = require('../common/common')

exports.submitUserAction = (req, res, next) => {
  common.saveUserAction(req.body, (resultObj) => {
    if(resultObj.status == 0){
      return next(resultObj.obj)
    } else {
      return res.json(resultObj.obj)
    }
  })
}


exports.updateUserAction = (req, res, next) => {
  const resultObj = common.updateUserAction(req.body, (resultObj) => {
    if(resultObj.status == 0){
      return next(resultObj.obj)
    } else {
      return res.json(resultObj.obj)
    }
  })
}

exports.getUserHisotry = (req, res, next) => {
  const resultObj = common.getUserHisotry(req.body, (resultObj) => {
    if(resultObj.status == 0){
      return next(resultObj.obj)
    } else {
      return res.json(resultObj.obj)
    }
  })
}
