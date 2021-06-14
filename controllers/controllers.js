const mongoose = require('mongoose')
const messages = require('../messages')
const crypto = require('crypto-js/sha256')
const Mongo = require('../models/mongoSchema')


module.exports.mongoConnection = () => {
    return mongoose.connect(messages.URI, { useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports.users = async (req, res) => {
     try {
          const users = await Mongo.find()
          let new_user = []
          await users.map(user => {
               let { _id, name, surname } = user
               new_user.push({ _id, name, surname }) 
          })
          res.status(200).json(new_user)
          
     } catch (error) {
          res.status(500).json({ message: error })         
     }  
}

module.exports.singleUser = async (req, res) => {
     try{
          const user = await Mongo.findById(req.params.id)
          let {_id, name, surname } =  await user
          res.status(200).json({ _id, name, surname })
     } catch (error) {
          res.status(500).json({ message: error })
     } 
}

module.exports.postUser = async (req, res) => {
     try {
          let { name, surname, password } = req.body
          password = crypto(password).toString()
          let user = new Mongo({ name, surname, password })
          await user.save()
          let {_id } = await user
          res.status(200).json({ _id, name, surname })
          
     } catch (error) {
          console.log(error)
          res.status(500).json({ message: error })          
     }   

}

module.exports.deleteUser = async (req, res) => {    
     try {
          const user = await Mongo.deleteOne({ _id: req.params.id })
          res.status(200).json({message: "user deleted"})
          
     } catch (error) {
          res.status(500).json({ message: error })          
     }
}

module.exports.updateUser = async (req, res) => {
     try {
          const user = await Mongo.updateOne({ _id: req.params.id }, req.body)
          res.status(200).json({user})
          
     } catch (error) {
          res.status(500).json({ message: error })          
     }
}
