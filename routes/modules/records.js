const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record ')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
})

router.post('/', async (req, res) => {
  const record = req.body
  const list = await Category.find({ title: `${record.category}` })
  try {
    record.icon = list[0].icon
    Record.create(record)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
