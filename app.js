const express = require('express')
const routings = require('./routings/routings')
const messages = require('./messages')

const { mongoConnection } = require('./controllers/controllers')

const app = express()

mongoConnection()
    .then(() => { 
        app.listen(3000)
        console.log(messages.connected)
    })
    .catch(error => console.log(error))

app.use(express.json())

app.use('/api', routings)

app.get('/', (req, res) => {
    res.send('Home')
})
