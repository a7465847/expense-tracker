const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    category: String,
  },
  store: {
    category: String,
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  },
  amount: {
    type: String,
  },
})

module.exports = mongoose.model('Record', recordSchema)