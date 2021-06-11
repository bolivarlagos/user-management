const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')

router.get('/users', controllers.users)
router.get('/users/:id', controllers.singleUser)
router.post('/users/post', controllers.postUser)
router.delete('/users/:id', controllers.deleteUser)
router.patch('/users/:id', controllers.updateUser)

module.exports = router



