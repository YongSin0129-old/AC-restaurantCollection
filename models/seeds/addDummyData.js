const Restaurant = require('../restaurant')
const dummyData = require('../../restaurant.json').results
const mongoose = require('../../config/mongoose')
const db = mongoose.connection

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
    db.close()
    console.log('database closed')
  } catch (error) {
    console.log(error)
  }
})

async function createDummyData () {
  for (let i = 0; i < dummyData.length; i++) {
    const restaurant = new Restaurant(dummyData[i])
    await restaurant.save()
  }
}
// ! 不能使用 forEach 因為它本身就是一個 callback function
// ! 會造成 restaurant.save() 還在進行，但 db.close() 也跟著同步進行的問題
// ! MongoError: Topology is closed, please connect
// 原本 建立資料是用 forEach 配合 save() 來使用，但最後要用 db.close()時會遇到非同步的問題
// 迴圈沒有跑完但 db 卻 close
// 使用 async await .then callback 都沒有用
// 留著等以後知道怎麼解再來試
//
// function createDummyData () {
//   dummyData.forEach(data => {
//     const restaurant = new Restaurant(data)
//     restaurant.save()
//   })
// }
