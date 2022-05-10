const express = require('express')
const exphbs = require('express-handlebars').engine
// 載入種子資料
const restaurants = require('./restaurant.json').results
// 判斷資料的個數，用於限定動態路由的區間
const restaurantsCount = restaurants.length
const port = 3000

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get(`/restaurants/:id([1-${restaurantsCount}])`, (req, res) => {
  const selectedIndex = Number(req.params.id) - 1
  const selectedRestaurant = restaurants[selectedIndex]
  res.render('show', { selectedRestaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const searchedRestaurant = restaurants.filter((restaurant) => {
    const { name, category } = restaurant
    return (name + category).toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: searchedRestaurant, keyword })
})

app.get('*', (req, res) => {
  res.send('404 not found')
})

app.listen(port, () => {
  console.log('this server is listening on http://localhost:3000')
})
