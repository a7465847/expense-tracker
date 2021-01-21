if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record ')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const recordlist = [
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
]

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const newUser = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    await Promise.all(Array.from({ length: 3 },
      (_, i) => Record.create({
        ...recordlist[i], userId: newUser._id
      }))
    )
    console.log('Record seed data created in mongodb')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})
