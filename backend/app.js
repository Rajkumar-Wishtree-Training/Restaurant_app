const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()

const errorMiddleware = require('./middlewares/error')

app.use(cors({credentials : true , origin: 'http://localhost:3000'}))

app.use(express.json({limit:'50mb'}))
app.use(cookieParser())  
app.use(express({limit:'50mb' , extended: false , parameterLimit: 50000 }));
app.use(fileUpload());

//Route Imports
const menu = require('./routes/menuRoute')
const user = require('./routes/userRoute')

app.use("/api/v1", menu)
app.use("/api/v1", user)

//Using Middlewares
app.use(errorMiddleware)

module.exports = app;