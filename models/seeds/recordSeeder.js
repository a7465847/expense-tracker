const Record = require('../record ')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Record mongodb open')
  const record = []
  record.push(
    Record.create(
      {
        name: '早餐',
        category: '餐飲食品',
        date: '2020-11-28',
        amount: 60,
        icon: '<i class="fas fa-utensils"></i>'
      },
      {
        name: '電影',
        category: '休閒娛樂',
        date: '2020-11-28',
        amount: 300,
        icon: '<i class="fas fa-grin-beam"></i>'
      },
      {
        name: '火車',
        category: '交通出行',
        date: '2020-11-28',
        amount: 75,
        icon: '<i class="fas fa-shuttle-van"></i>'
      }
    )
  )
  Promise.all(record).then(() => {
    console.log('Record seed done!')
    process.exit()
  })
})
