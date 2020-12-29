const express = require('express')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/record ')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => { totalAmount += record.amount })
      res.render('index', { records, totalAmount })
    })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
