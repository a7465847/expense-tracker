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
        image: 'https://i.imgur.com/QSXg53q.jpg',
        description: '台北車站街頭不起眼的巷弄裡,只選用最新鮮的頂級原料,口味道地的傳統美食',
        icon: '<i class="fas fa-utensils"></i>'
      },
      {
        name: '電影',
        category: '休閒娛樂',
        date: '2020-11-28',
        amount: 300,
        image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
        description: '台北二輪片,在一次欣賞侏儸紀公園的力與美,回味最經典故事內容',
        icon: '<i class="fas fa-grin-beam"></i>'
      },
      {
        name: '火車',
        category: '交通出行',
        date: '2020-11-28',
        amount: 75,
        image: 'https://i.imgur.com/0J4dUOJ.jpg',
        description: '這次搭乘自強號,前往台北',
        icon: '<i class="fas fa-shuttle-van"></i>'
      }
    )
  )
  Promise.all(record).then(() => {
    console.log('Record seed done!')
    db.close()
  })
})
