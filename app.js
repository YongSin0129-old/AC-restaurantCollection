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
app.get('/createNewRestaurant', (req, res) => {
  res.render('create')
})
app.post('/createNewRestaurant', (req, res) => {
  Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
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
app.get('/updateRestaurant/:id', (req, res, next) => {
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
app.post('/updateRestaurant/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id).then(data => {
    data.name = req.body.name
    data.name_en = req.body.name_en
    data.category = req.body.category
    data.image = req.body.image
    data.location = req.body.location
    data.phone = req.body.phone
    data.google_map = req.body.google_map
    data.rating = req.body.rating
    data.description = req.body.description
    data.save()
    res.redirect('/')
  })
})
// delete restaurant
app.post('/deleteRestaurant/:id', (req, res) => {
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
