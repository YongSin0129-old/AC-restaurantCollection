const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create new restaurants
router.get('/new', (req, res) => {
  res.render('create')
})
router.post('', (req, res) => {
  Restaurant.create(req.body)
  res.redirect('/')
})

// 各餐廳的介紹
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  if (id.length !== 24) {
    next()
  } else {
    Restaurant.findById(id)
      .lean()
      .then(selectedRestaurant => {
        if (selectedRestaurant) {
          res.render('show', { selectedRestaurant })
        } else {
          next()
        }
      })
  }
})
// update restaurant
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  if (id.length !== 24) {
    next()
  } else {
    Restaurant.findById(id)
      .lean()
      .then(selectedRestaurant => {
        if (selectedRestaurant) {
          res.render('update', { selectedRestaurant })
        } else {
          next()
        }
      })
  }
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).then(data => {
    data = Object.assign(data, req.body)
    data.save()
    res.redirect('/')
  })
})
// delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.deleteOne({ _id: id }).then(() => res.redirect('/'))
})

module.exports = router
