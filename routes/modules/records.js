const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record ')
let filterCategory = ''
let filterMonths = ''

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
    const monthSearch = `[0-9]{4}-${months}-[0-9]{2}`

    if (sort === '類別全部') {
      return res.redirect('/')
    } else if (months === '月份篩選') {
      return res.redirect('/')
    }
    const query = {
      $or: [
        { date: { $regex: monthSearch, $options: 'i' }, userId },
        { category: sort, userId }
      ]
    }
    const myRecords = await Record.find(query).lean()
    const type = sort ? 'category' : 'months'
    if (type === 'category') {
      filterCategory = sort
    } else {
      filterMonths = months
    }
    console.log('filterCategory', filterCategory, 'filterMonths', filterMonths)
    if (filterCategory && filterMonths && type === 'category') {
      const records = myRecords.filter(user => {
        if (user.date.substring(5, 7) === filterMonths) {
          totalAmount += user.amount
        }
        return user.date.substring(5, 7) === filterMonths
      })
      const months = filterMonths
      return res.render('index', { records, totalAmount, sort, months })
    } else if (filterCategory && filterMonths && type === 'months') {
      const records = myRecords.filter(user => {
        if (user.category === filterCategory) {
          totalAmount += user.amount
        }
        return user.category === filterCategory
      })
      const sort = filterCategory
      return res.render('index', { records, totalAmount, months, sort })
    } else {
      myRecords.forEach(sort => {
        totalAmount += sort.amount
      })
      const records = myRecords
      if (type === 'category') {
        return res.render('index', { records, totalAmount, sort })
      } else {
        return res.render('index', { records, totalAmount, months })
      }
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
