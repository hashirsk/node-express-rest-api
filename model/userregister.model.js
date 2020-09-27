const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userregister = new Schema({
  name:{
    type: String
  },
  email:{
    type: String
  },
  question:{
    type: String
  },
  answer: {
    type: String
  },
  log:{
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('UserRegister', userregister)
