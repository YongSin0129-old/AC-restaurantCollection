const mongoose = require('mongoose')

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
