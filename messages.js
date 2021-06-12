require('dotenv').config()

const messages = {
    URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.n4aol.mongodb.net/${process.env.MONGO_COLLECTION}`,
    connected: 'Connected to the database',
    userDeleted: 'User deleted',
    userUpdated: 'User updated'        
}

module.exports = messages
