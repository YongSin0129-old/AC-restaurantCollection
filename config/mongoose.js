const mongoose = require('mongoose')
require('dotenv').config()

// create mongoose connection
mongoose
  .connect(process.env.DOT_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('mongoose ok !')
  })
  .catch(error => {
    console.log('mongoose NG !')
    console.log(error)
  })

module.exports = mongoose
