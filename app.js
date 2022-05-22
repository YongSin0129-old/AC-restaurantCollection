const express = require('express')
const app = express()
const exphbs = require('express-handlebars').engine
const Restaurant = require('./models/restaurant')
// 載入種子資料
// const restaurants = require('./restaurant.json').results
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')
// 靜態資料統一放在 public
app.use(express.static('public'))

// 首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => {
      console.log(error)
    })
})

// 各餐廳的介紹
app.get('/restaurants/:id', (req, res) => {
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
