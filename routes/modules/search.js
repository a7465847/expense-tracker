const express = require('express')
const router = express.Router()
const Record = require('../../models/record ')

router.get('/', async (req, res) => {
  const keyword = req.query.keyword
  Record.find()
    .lean()
    .then(record => {
      const recordSearch = record.filter(record => {
        return record.name.toLowerCase().includes(keyword.trim().toLowerCase())
      })
      res.render('index', { records: recordSearch, keyword: keyword })
    })
})

module.exports = router
