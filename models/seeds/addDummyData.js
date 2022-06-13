const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const dummyData = require('../../restaurant.json').results
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

const seedUsers = [
  { name: 'user1', email: 'user1@example.com', password: '12345678' },
  { name: 'user2', email: 'user2@example.com', password: '12345678' }
]

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', async () => {
  try {
    // 先將 dataBase 清空再創造新的資料
    await User.deleteMany()
    await Restaurant.deleteMany()
    console.log('delete all data in database')
    await createDummyData()
    console.log('create New dummyData Successfully')
    console.log('database closed')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})

async function createDummyData () {
  for (let i = 0; i < seedUsers.length; i++) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(seedUsers[i].password, salt)
    seedUsers[i].password = hash
    const user = await User.create(seedUsers[i])
    switch (user.name) {
      case 'user1':
        for (let i = 0; i < 3; i++) {
          const restaurantData = Object.assign({}, dummyData[i], {
            userId: user._id
          })
          await Restaurant.create(restaurantData)
        }
        continue
      case 'user2':
        for (let i = 3; i < 6; i++) {
          const restaurantData = Object.assign({}, dummyData[i], {
            userId: user._id
          })
          await Restaurant.create(restaurantData)
        }
        continue
    }
  }
}
