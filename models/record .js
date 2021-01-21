const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String
  },
  date: {
    type: String,
    require: true,
    default: Date.now
  },
  amount: {
    type: Number,
    require: true
  },
  merchant: {
    type: String,
    require: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
