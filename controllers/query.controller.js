const QuerySchema = require('../model/query.model');

exports.submitQuestions = (req, res, next) => {
  QuerySchema.create(req.body, (err, data) => {
    if(err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
}

exports.getAnswers = (req, res, next) => {
  QuerySchema.findOne({ questions: req.body.query}, (err, data) => {
    if(err) {
      return next(err)
    } else {
      return res.json(data)
    }
  })
}
