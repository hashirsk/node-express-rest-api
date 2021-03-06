const mongoose = require('mongoose')
const Schema = mongoose.Schema

let querySchema = new Schema({
  questions : {
    type: [String]
  },
  answers :{
    type: [String]
  }
}, {
  collection: 'query'
})

module.exports = mongoose.model('QuerySchema', querySchema)
