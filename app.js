const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const sessionRouter = require('./controllers/sessions')
const tasksetRouter = require('./controllers/tasksets')

mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/sessions',sessionRouter)
app.use('/api/tasksets',tasksetRouter)
module.exports = app