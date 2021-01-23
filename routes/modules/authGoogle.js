const express = require('express')
const router = express.Router()
const passport = require('passport')

// when user clicks login with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'] // the data we asked from google
}))

// callback route is when user clicks agree
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
