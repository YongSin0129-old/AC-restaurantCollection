const Restaurant = require('../restaurant')
const dummyData = require('../../restaurant.json').results
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

function createDummyData () {
  dummyData.forEach(data => {
    const restaurant = new Restaurant({
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description
    })
    restaurant.save()
  })
}

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', async () => {
  try {
    // 先將 collection 清空再創造新的資料
    await Restaurant.deleteMany()
    console.log('delete all data in database')
    await createDummyData()
    console.log('create New dummyData Successfully')
  } catch (error) {
    console.log(error)
  }
})
