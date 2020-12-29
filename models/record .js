const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  },
  amount: {
    type: Number
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  icon: {
    type: String
  }
})

module.exports = mongoose.model('Record', recordSchema)
