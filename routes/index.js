const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const noFound404 = require('./modules/noFound404')

router.use('/Restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)
router.use('/', home)
// 查無資料時的路由
router.use('*', noFound404)

module.exports = router
