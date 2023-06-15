const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength:2
  },
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Person'
//     }
//   ],
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)