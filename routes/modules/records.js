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

// 篩選
router.get('/', async (req, res) => {
  try {
    let totalAmount = 0
    const userId = req.user._id
    const { months, sort } = req.query
    const query = {
      dateOrCategory: {
        $or: [
          { date: { $regex: `[0-9]{4}-${months}-[0-9]{2}` }, userId },
          { category: sort, userId }
        ]
      },
      all: {
        $and: [
          { date: { $regex: `[0-9]{4}-${months}-[0-9]{2}` }, userId },
          { category: sort, userId }
        ]
      }
    }

    if (query.dateOrCategory) {
      const records = await Record.find(query.dateOrCategory).lean()
      if (records.length === 0) return res.redirect('/')
      console.log(records)
      records.forEach(record => {
        totalAmount += record.amount
        return res.render('index', { records, totalAmount, sort, months })
      })
    } else {
      const records = await Record.find(query.all).lean()
      if (records.length === 0) return res.redirect('/')
      console.log(records)
      records.forEach(record => {
        totalAmount += record.amount
        return res.render('index', { records, totalAmount, sort, months })
      })
    }
  } catch (err) {
    console.log(err)
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
