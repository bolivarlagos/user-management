const express = require('express')
const mongoose = require('mongoose')
const messages = require('./messages')
const routings = require('./routings/routings')

const app = express()

mongoose
    .connect(
        messages.URI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => {
        app.listen(3000)
        console.log(messages.connected)
        })
    .catch(error =>  console.log(error))

app.use(express.json())

app.use('/api', routings)

app.get('/', (req, res) => {
    res.send('Home')
})
