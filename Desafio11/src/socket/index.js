
const { getAllProducts, saveProduct } = require('../daos/productos/ProductosSQL');

const { MessagesDao } = require('./../daos/index');
const { normalizeMessages } = require('./../utils/normalize');

const myMessages = new MessagesDao();

module.exports = async (io, socket) => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);
    
    // messages
    const messages = await myMessages.readAll();

    const messagesNormalized = normalizeMessages(messages);

    socket.emit('messages', messagesNormalized);

    socket.on('new-message', async data => {
        await myMessages.create(data);

        const messages = await myMessages.readAll();

        const messagesNormalized = normalizeMessages(messages);

        io.sockets.emit('messages', messagesNormalized);
    });

    // Agregar producto
    const products = await getAllProducts();
    socket.emit('products', products);

    socket.on('new-product',async product => {
        
        await saveProduct(product);

        const products = await getAllProducts();

        io.sockets.emit('products', products);
    });

}