const mongoose = require('mongoose')
const Schema = mongoose.Schema

let querySchema = new Schema({
  question: {
    type: String
  },
  answer: {
    type: String
  }
})

module.exports = mongoose.model('QuerySchema', querySchema)
