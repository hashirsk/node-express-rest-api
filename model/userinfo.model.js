const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
      name : {
        type: String
      },
      source: {
        type: [{
          type: String,
          enum: ['facebook', 'telegram']
        }]
      },
      unique_id: {
        type: String
      },
      session:{
        type: String
      },
      date:{
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('UserSchema', userSchema)
