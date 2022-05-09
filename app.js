const express = require('express')
const exphbs = require('express-handlebars').engine
const restaurants = require('./restaurant.json').results
const port = 3000

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const selectedIndex = Number(req.params.id) - 1
  const selectedRestaurant = restaurants[selectedIndex]
  res.render('show', { selectedRestaurant })
})

app.listen(port, () => {
  console.log('this server is listening on http://localhost:3000')
})
