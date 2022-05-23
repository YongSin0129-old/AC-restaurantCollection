const Restaurant = require('../restaurant')
const dummyData = require('../../restaurant.json').results

function createSeedSuccessfully () {
  console.log('create dummyData Successfully')
}

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
  }, createSeedSuccessfully())
}

// 先將 collection 清空再創造新的資料
Restaurant.deleteMany()
  .then(() => {
    createDummyData()
  })
  .catch(error => {
    console.log(error)
  })
