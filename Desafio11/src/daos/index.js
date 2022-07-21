const ProductosSQL = require('./productos/ProductosSQL')
const MessagesMongoDB = require('./messages/MessagesMongoDB');
const UsersMongoDB = require('./users/UsersMongoDB');


const DAO = {
    ProductosDao: ProductosSQL,
    MessagesDao: MessagesMongoDB,
    UsersDao: UsersMongoDB
}

module.exports = DAO;

