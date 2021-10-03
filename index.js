const express = require('express')
const app = express()
require('dotenv').config()
const api = process.env.API_URL
const product = require('./routing/ProductR')
const category = require('./routing/CategorR')

var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
require('./database/dbConnect')

//* Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())
app.use(morgan('tiny'))

app.use(`${api}/products`, product)
app.use(`${api}/category`, category)

app.listen(process.env.Port || 3000, () => {
    console.log('Server localhost:3000 porunda')
})
