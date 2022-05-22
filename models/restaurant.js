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

// Defining a Model
const Schema = mongoose.Schema

const Restaurant = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: String,
  description: String
})
module.exports = mongoose.model('Restaurant', Restaurant)
