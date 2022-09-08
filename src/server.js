require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const caseRoutes = require('./routes/cases')
const modelRoutes = require('./routes/models')

// express app
const app = express()
const cors = require('cors')

// middleware - logging requests
app.use(express.json(), cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/cases', caseRoutes)
app.use('/api/models', modelRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, ( )=> {
            console.log('connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })