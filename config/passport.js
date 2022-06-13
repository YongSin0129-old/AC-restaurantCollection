const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')
require('dotenv').config()

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email }).then(user => {
          if (!user) {
            return done(null, false, {
              message: '這個 email 還沒有被註冊'
            })
          }
          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, {
                  message: 'Email 或 Password 不正確.'
                })
              }
              return done(null, user)
            })
            .catch(err => done(err, false))
        })
      }
    )
  )
  // 設定 Facebook 登入策略
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_callbackURL,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email }).then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random()
            .toString(36)
            .slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash =>
              User.create({
                name,
                email,
                password: hash
              })
            )
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
      }
    )
  )

  // 序列及反序列化

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
