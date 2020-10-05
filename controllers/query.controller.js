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
    platform: req.body.platform
  }

  common.saveUserAction(request, (resultObj) => {

    if (resultObj.status == 200) {
      request.id = resultObj.obj._id
    }
    const attachUrl = req.body.attachment
    console.log("It has attachment ?", attachUrl)
    if (attachUrl) {
      //load attachment and save it to file
      const payload = {payloadId: resultObj.obj._id, userid: request.userId}
      common.downloadFile(attachUrl, `/attachment/${request.userId}`, payload).then(response => {
        console.log('Here we are getting payload=>', response.payload)
        //request.attachment = `${req.headers.host}+/+${response.path}`
        request.attachment = {
          userid: response.payload.userid,
          ext: response.payload.ext,
          filename: response.payload.filename
        }

        request.id = response.payload.payloadId
        common.updateUserAction(request, (resultObj) => {
          //console.log(resultObj)
        })
      }).catch( errResponse=> {
        console.log('Here we are getting payload on error side=>', errResponse)
        request.id = errResponse.payload.payloadId
        request.attachment = {
          url: attachUrl
        }
        common.updateUserAction(request, (resultObj) => {
          //console.log(resultObj)
        })
      }
      )
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
        return res.json({ 'ans': ans })
      }
    })
  })
}
