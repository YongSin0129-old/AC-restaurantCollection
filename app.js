const express = require('express')
const app = express()
const exphbs = require('express-handlebars').engine
const Restaurant = require('./models/restaurant')
const port = 3000

// set view engine and view path
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// 靜態資料統一放在 public
app.use(express.static('public'))
// load bodyParser
app.use(express.urlencoded({ extended: true }))

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

// create new restaurants
app.get('/Restaurants/new', (req, res) => {
  res.render('create')
})
app.post('/Restaurants', (req, res) => {
  Restaurant.create(req.body)
  res.redirect('/')
})

// 各餐廳的介紹
app.get('/restaurants/:id', (req, res, next) => {
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
app.get('/Restaurants/:id/edit', (req, res, next) => {
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
app.post('/Restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).then(data => {
    data = Object.assign(data, req.body)
    data.save()
    res.redirect('/')
  })
})
// delete restaurant
app.post('/Restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.deleteOne({ _id: id }).then(() => res.redirect('/'))
})

// 收尋的路由
app.get('/search', (req, res, next) => {
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

// 查無資料時的路由
app.get('*', (req, res) => {
  res.render('notFound')
})

app.listen(port, () => {
  console.log('this server is listening on http://localhost:3000')
})
