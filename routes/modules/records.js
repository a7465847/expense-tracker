const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record ')

// 新增資料page
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().exec()
    return res.render('new', { categories })
  } catch (err) {
    console.log(err)
  }
})

// 送出資料
router.post('/', async (req, res) => {
  try {
    const record = req.body
    console.log(record)
    const userId = req.user._id
    const list = await Category.find().lean().exec()
    record.icon = list[0].icon
    if (!record.image) { record.image = 'https://i.imgur.com/rKa0IFa.jpg' }
    Record.create({ ...record, userId })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

// 刪除資料
router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const record = await Record.findOne({ _id, userId }).exec()
    record.remove()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/', async (req, res) => {
  const userId = req.user._id
  const { months, sort } = req.query
  let totalAmount = 0

  let query

  if (months === '月份篩選' && sort === '類別全部') {
    query = {
      userId
    }
    pluralFilter(query)
    return
  }

  if (months !== '月份篩選' && sort !== '類別全部') {
    query = {
      userId,
      category: sort,
      $expr: {
        $eq: [{ $month: '$date' }, Number(months)]
      }
    }
    pluralFilter(query)
    return
  }

  if (sort !== '類別全部') {
    query = [
      { $match: { userId } },
      { $match: { category: sort } }
    ]
    sortFilter(query)
    return
  }

  if (months !== '月份篩選') {
    query = {
      userId,
      $expr: {
        $eq: [{ $month: '$date' }, Number(months)]
      }
    }
    monthsFilter(query)
  }

  // 複數篩選
  async function pluralFilter (data) {
    const records = await Record.find(data).lean()
    records.forEach(user => {
      user.date = JSON.stringify(user.date).substring(0, 10)
      totalAmount += user.amount
    })
    return res.render('index', { records, totalAmount, months, sort })
  }
  // 單一sort
  async function sortFilter (data) {
    const records = await Record.aggregate(data)
    records.forEach(user => {
      user.date = JSON.stringify(user.date).substring(0, 10)
      totalAmount += user.amount
    })
    return res.render('index', { records, totalAmount, sort })
  }
  // 單一months
  async function monthsFilter (data) {
    const records = await Record.find(data).lean()
    records.forEach(user => {
      user.date = JSON.stringify(user.date).substring(0, 10)
      totalAmount += user.amount
    })
    return res.render('index', { records, totalAmount, months })
  }
})

// 編輯資料
router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const categories = await Category.find().lean().exec()
    const record = await Record.findOne({ _id, userId }).lean().exec()
    return res.render('edit', { record, categories })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const options = req.body
    const _id = req.params.id
    const userId = req.user._id
    await Record.findOne({ _id, userId })
      .then(record => {
        record = Object.assign(record, options)
        return record.save()
      })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
