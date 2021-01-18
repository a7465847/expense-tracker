const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')
const comparison = helpers.comparison()
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ helpers: comparison, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisMyExpenseTracker',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }))

usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
