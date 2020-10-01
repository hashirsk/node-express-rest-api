const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userHistory = new Schema({
  userId:{
    type: String
  },
  queryAskTime: {
    type: Date,
    default: Date.now
  },
  answerTime: {
    type: Date,
    default: Date.now
  },
  userQuery: {
    type: String
  },
  answerBySystem: {
    type: String
  },
  platform: {
    type: String,
    enum: ['facebook', 'telegram', 'unknown'],
    default: 'unknown'
  },
  attachment: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('UserHistory', userHistory)
