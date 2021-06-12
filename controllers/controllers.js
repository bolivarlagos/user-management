const mongoose = require('mongoose')
const messages = require('../messages')
const crypto = require('crypto-js/sha256')
const Mongo = require('../models/mongoSchema')

module.exports.mongoConnection = () => {
    return mongoose.connect(messages.URI, { useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports.users = (req, res) => {
    Mongo.find()
    .then(users => {  
        let new_user = []   
        users.map(user => {                        
            let { _id, name, surname } = user
            new_user.push({ _id, name, surname })           
        })  
        res.json(new_user)
    })    
    .catch(error => console.log(error))    
}

module.exports.singleUser = (req, res) => {
    Mongo.findById(req.params.id)
    .then((user) => {
        let { _id, name, surname } = user
        res.json({_id, name, surname})
    })
    .catch(error => console.log(error))
}

module.exports.postUser = (req, res) => {
    let { name, surname, password } = req.body
    password = crypto(password).toString()
    let user = new Mongo({ name, surname, password})
    user.save()
    .then((user) => console.log(user))
    .catch(error => console.log(error))
}

module.exports.deleteUser = (req, res) => {
    console.log(req.params.id)
    Mongo.deleteOne({ _id: req.params.id })
    .then(() => console.log(messages.userDeleted))
    .catch(error => console.log(error))
}

module.exports.updateUser = (req, res) => {
    Mongo.updateOne({ _id: req.params.id }, req.body)
    .then(() => console.log(messages.userUpdated))
    .catch(error => console.log(error))
}