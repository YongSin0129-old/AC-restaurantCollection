require('./config/mongoose')
const express = require('express')
const app = express()
const router = require('./routes')
const exphbs = require('express-handlebars').engine
const port = 3000

// set view engine and view path
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// 靜態資料統一放在 public
app.use(express.static('public'))
// load bodyParser
app.use(express.urlencoded({ extended: true }))
// 設定總路由
app.use(router)

app.listen(port, () => {
  console.log('this server is listening on http://localhost:3000')
})
