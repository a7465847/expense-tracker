const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  title: { type: String },
  icon: { type: String }
})

module.exports = mongoose.model('Category', categorySchema)