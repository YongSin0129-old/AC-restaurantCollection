const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

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
