const QuerySchema = require('../model/query.model');
const common = require('../common/common')

exports.submitQuestions = (req, res, next) => {
  QuerySchema.create(req.body, (err, data) => {
    if (err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
}

exports.getAnswers = (req, res, next) => {
  let request = {
    userId: req.body.userId,
    messageId: req.body.messageId,
    replyToMessage: req.body.replyToMessage,
    queryAskTime: (new Date()).getTime(),
    userQuery: req.body.query,
    platform: req.body.platform/*,
    attachUrl: req.body.attachment*/
  }

  common.saveUserAction(request, (resultObj) => {
    const documentId = resultObj.obj._id
    if (resultObj.status == 200) {
      request.id = documentId
    }

    if(request.userQuery === 'attachment') {
      request.answerBySystem = "We received your attachment. Thanks"
        request.answerTime = (new Date()).getTime()
        common.updateUserAction(request, (resultObj) => {
          console.log(resultObj)
        })
      return res.json({ 'ans': ans, '_id': documentId })
    } 
    QuerySchema.findOne({ questions: request.userQuery }, (err, data) => {
      console.log('finding query');
      if (err) {
        return next(err)
      } else {
        let ans = "Hi, we have received your request, Support team will resolve your query asap.\nThanks :)"
        if (data) {
          let index = data.questions.findIndex(el => el == request.userQuery)

          if (index == -1) {
            ans = "Hi, we have received your request, Support team will resolve your query asap.\nThanks :)"
          } else {
            ans = data.answers[index]
          }
        }

        request.answerBySystem = ans
        request.answerTime = (new Date()).getTime()
        common.updateUserAction(request, (resultObj) => {
          console.log(resultObj)
        })
        return res.json({ 'ans': ans, '_id': documentId })
      }
    })
  })
}
