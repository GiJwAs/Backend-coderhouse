const { PORT } = require('./config/globals');
const app = require('./server');

const server = app.listen(PORT, () => 
    console.log(`Servidor abierto en http://localhost:${PORT}/`)
);

server.on('error', error => {
    console.log('Error en servidor:', error)
});