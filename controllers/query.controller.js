const QuerySchema = require('../model/query.model');
const common = require('../common/common')

exports.submitQuestions = (req, res, next) => {
  QuerySchema.create(req.body, (err, data) => {
    if(err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
}

<<<<<<< HEAD

exports.getAnswer = (req, res, next) => {
  QuerySchema.find( { questions: [req.query] }, (err, data) => {
    if(err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
}
=======
exports.getAnswers = (req, res, next) => {
  let request = {
    userId: req.body.userId,
    queryAskTime: (new Date()).getTime(),
    userQuery: req.body.query
  }
  
  common.saveUserAction(request, (resultObj) => {
  
    if(resultObj.status == 200) {
      request.id = resultObj.obj._id
    }

    QuerySchema.findOne({ questions: request.userQuery}, (err, data) => {
      if(err) {
        return next(err)
      } else {
        console.log(data)
        let ans = "Hi, we have received your request, Support team will resolve your query asap.\n Thanks :)"
        if(data){
          let index = data.questions.findIndex(el=> el == request.userQuery)

          if(index == -1) {
            ans = "Hi, we have received your request, Support team will resolve your query asap.\n Thanks :)"
          } else {
            ans = data.answers[index]
          }
        }
  
        request.answerBySystem = ans
        request.answerTime = (new Date()).getTime()
        common.updateUserAction(request, (resultObj) => {
          console.log(resultObj)
        })
        return res.json({'ans': ans})
      }
    })
  })
}
>>>>>>> 89999b5d44dee72568f05c8fc6aac72c00fe47b5
