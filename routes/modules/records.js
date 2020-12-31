const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record ')

// 新增資料
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
    if (!record.image) { record.image = 'https://i.imgur.com/rKa0IFa.jpg' }
    Record.create(record)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 刪除資料
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 篩選
router.get('/', (req, res) => {
  const sort = req.query.sort
  let totalAmount = 0
  Record.find({ category: `${sort}` })
    .lean()
    .then(records => {
      if (sort.length === 0) { return res.redirect('/') }
      records.forEach(record => { totalAmount += record.amount })
      res.render('index', { records, totalAmount, sort })
    })
})

module.exports = router
