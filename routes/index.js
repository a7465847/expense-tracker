const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const search = require('./modules/search')
const users = require('./modules/user')

router.use('/', home)
router.use('/records', records)
router.use('/search', search)
router.use('/users', users)

module.exports = router
