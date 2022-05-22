const express = require('express')
const app = express()
const exphbs = require('express-handlebars').engine
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
// 載入種子資料
const restaurants = require('./restaurant.json').results
// 判斷資料的個數，用於限定動態路由的區間
const restaurantsCount = restaurants.length
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')
// 靜態資料統一放在 public
app.use(express.static('public'))

// 首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

// 各餐廳的介紹
app.get(`/restaurants/:id([1-${restaurantsCount}])`, (req, res) => {
  const selectedIndex = Number(req.params.id) - 1
  const selectedRestaurant = restaurants[selectedIndex]
  res.render('show', { selectedRestaurant })
})

// 收尋的路由
app.get('/search', (req, res, next) => {
  const keyword = req.query.keyword.toLowerCase()
  const searchedRestaurant = restaurants.filter(restaurant => {
    const { name, category } = restaurant
    return (name + category).toLowerCase().includes(keyword)
  })
  if (searchedRestaurant.length) {
    res.render('index', { restaurants: searchedRestaurant, keyword })
  } else {
    next()
  }
})

// 查無資料時的路由
app.get('*', (req, res) => {
  res.render('notFound')
})

app.listen(port, () => {
  console.log('this server is listening on http://localhost:3000')
})
