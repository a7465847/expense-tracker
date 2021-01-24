const express = require('express')
const router = express.Router()
const Record = require('../../models/record ')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    let totalAmount = 0
    const records = await Record.find({ userId }).lean().then(records => records)
    records.forEach(record => {
      record.date = record.date.toLocaleDateString()
      totalAmount += record.amount
    })
    res.render('index', { records, totalAmount })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
