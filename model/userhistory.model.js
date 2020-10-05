const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userHistory = new Schema({
  userId: {
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
    type: {
      userId: {
        type: String,
        default: ""
      },
      ext: {
        type: String,
        default: ""
      },
      filename: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      }
    },
    default: {}
  },
  messageId: {
    type: String,
    default: Date.now
  },
  replyToMessage: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('UserHistory', userHistory)
