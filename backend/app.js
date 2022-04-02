const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

const errorMiddleware = require('./middlewares/error')

app.use(express.json())
app.use(cookieParser())

//Route Imports
const menu = require('./routes/menuRoute')
const user = require('./routes/userRoute')

app.use("/api/v1", menu)
app.use("/api/v1", user)

//Using Middlewares
app.use(errorMiddleware)

module.exports = app;