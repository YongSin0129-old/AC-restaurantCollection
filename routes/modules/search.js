const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 收尋的路由
router.get('', (req, res, next) => {
  const keyword = req.query.keyword
  const sortMethod = req.query.sort || '_id'
  const regex = new RegExp(`${keyword}`, 'i')
  Restaurant.find({ $or: [{ name: regex }, { category: regex }] })
    .sort(sortMethod)
    .lean()
    .then(restaurants => {
      if (restaurants.length) {
        res.render('index', { restaurants, keyword })
      } else {
        next()
      }
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
