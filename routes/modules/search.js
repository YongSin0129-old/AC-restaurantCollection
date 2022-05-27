const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 收尋的路由
router.get('', (req, res, next) => {
  const keyword = req.query.keyword
  const regex = new RegExp(`${keyword}`, 'i')
  Restaurant.find({ $or: [{ name: regex }, { category: regex }] })
    .lean()
    .then(restaurants => {
      if (restaurants.length) {
        res.render('index', { restaurants })
      } else {
        next()
      }
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
