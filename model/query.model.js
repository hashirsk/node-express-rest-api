const mongoose = require('mongoose')
const Schema = mongoose.Schema

let querySchema = new Schema({
<<<<<<< HEAD
  questions : {
    type: [String]
  },
  answers :{
    type: [String] 
=======
  questions: {
    type: [String]
  },
  answers: {
    type: [String]
>>>>>>> 89999b5d44dee72568f05c8fc6aac72c00fe47b5
  }
})

module.exports = mongoose.model('QuerySchema', querySchema)
