const Mongo = require('../models/mongoSchema')

module.exports.users = (req, res) => {
    Mongo.find()
    .then(users => {        
        res.json(users)
    })    
    .catch(error => console.log(error))    
}

module.exports.singleUser = (req, res) => {
    Mongo.findById(req.params.id)
    .then((user) => res.json(user))
    .catch(error => console.log(error))
}

module.exports.postUser = (req, res) => {
    let user = new Mongo(req.body)
    user.save()
    .then((user) => console.log(user))
    .catch(error => console.log(error))
}

module.exports.deleteUser = (req, res) => {
    console.log(req.params.id)
    Mongo.deleteOne({ _id: req.params.id })
    .then(() => console.log('user deleted'))
    .catch(error => console.log(error))
}

module.exports.updateUser = (req, res) => {
    Mongo.updateOne({ _id: req.params.id }, req.body)
    .then(() => console.log('updated'))
    .catch(error => console.log(error))
}