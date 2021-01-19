const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, req.flash('errors_msg', '帳號不存在 , 請前往註冊'))
        }
        const isMach = await bcrypt.compare(password, user.password)
        if (!isMach) {
          return done(null, false, req.flash('errors_msg', '輸入密碼不正確 , 請再次確認後輸入'))
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
      }
    }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { name, email } = profile._json
      const user = await User.findOne({ email })
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      return done(null, newUser)
    } catch (err) {
      console.log(err)
    }
  }))

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRE,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { email } = profile._json
      const user = await User.findOne({ email })
      if (user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const newUser = await User.create({
        email,
        password: hash
      })
      return done(null, newUser)
    } catch (err) {
      console.log(err)
    }
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}
