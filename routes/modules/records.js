const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
})
router.post('/', (req, res) => {
  console.log('req.body', req.body)
})

module.exports = router
