const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const search = require('./modules/search')
const users = require('./modules/user')
const authFb = require('./modules/authFb')
const authGoogle = require('./modules/authGoogle')
const { authenticator } = require('../middleware/auth')

router.use('/records', authenticator, records)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/authFb', authFb)
router.use('/authGoogle', authGoogle)
router.use('/', authenticator, home)

module.exports = router
