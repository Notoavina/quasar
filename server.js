const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/node_auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connection reussie')
})

const routes = require('./routes/routes')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(3000)