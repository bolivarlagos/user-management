const mongoose = require('mongoose')

const mongoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const Mongo = mongoose.model('Mongo', mongoSchema)

module.exports = Mongo

