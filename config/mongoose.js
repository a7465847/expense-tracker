const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI || 'mongodb://localhost/expense-tracker'

mongoose.connect(DB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('my mongodb conneted')
})

module.exports = db
