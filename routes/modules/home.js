const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  const sortMethod = req.query.sort || '_id'
  Restaurant.find()
    .sort(sortMethod)
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router
