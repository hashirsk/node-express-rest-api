const UserHistory = require('../model/userhistory.model')

exports.saveUserAction = (body, callback) => {
    UserHistory.create(body, (error, data)=>{
      if(error) {
        callback({'status': 0 , 'obj': error })
      } else {
        callback({'status': 200 , 'obj': data })
      }
    })
  }


  exports.updateUserAction = (body, callback) => {
   
    UserHistory.findOneAndUpdate({_id: body.id},{
        $set: body
      }, (error, data)=>{
        if(error) {
            callback({'status': 0 , 'obj': error })
          } else {
            callback({'status': 200 , 'obj': data })
          }
      })
  }

  exports.getUserHisotry = (body, callback) => {
   
    UserHistory.find({}, (error, data)=>{
        if(error) {
            callback({'status': 0 , 'obj': error })
          } else {
            callback({'status': 200 , 'obj': data })
          }
      })
  }
