const express = require('express')
const app = express()
require('dotenv').config()

app.listen(process.env.Port || 3000, () => {
    console.log('Server localhost:3000 porunda')
})
