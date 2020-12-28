const express = require('express')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('MY web app')
})

app.listen(port, () => {
	console.log(`Express is running on http://localhost:${port}`)
})
