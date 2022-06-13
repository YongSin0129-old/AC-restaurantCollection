const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// create mongoose connection
mongoose
  .connect(process.env.DOT_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('mongoose ok !')
  })
  .catch(error => {
    console.log('mongoose NG !')
    console.log(error)
  })

module.exports = mongoose
