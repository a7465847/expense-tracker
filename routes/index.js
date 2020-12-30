const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const search = require('./modules/search')

router.use('/', home)
router.use('/records', records)
router.use('/search', search)

module.exports = router
