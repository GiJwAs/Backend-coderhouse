const { STORAGE } = require('../config/globals');

const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo');
const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo');

const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria');
const CarritosDaoMemoria = require('./carritos/CarritosDaoMemoria');

const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase');
const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase');

const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB');
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB');

const daos = {
    archivo: {
        ProductosDao: ProductosDaoArchivo,
        CarritoDao: CarritosDaoArchivo
    },
    memoria: {
        ProductosDao: ProductosDaoMemoria,
        CarritoDao: CarritosDaoMemoria
    },
    firebase: {
        ProductosDao: ProductosDaoFirebase,
        CarritoDao: CarritosDaoFirebase
    },
    mongodb: {
        ProductosDao: ProductosDaoMongoDB,
        CarritoDao: CarritosDaoMongoDB
    }
}

module.exports = daos[STORAGE];