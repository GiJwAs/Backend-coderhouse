const { Router } = require('express');

const Productos = require('../models/Productos');
const Carrito = require('../models/Carrito');

const miProductos = new Productos('./data/productos.json');
const miCarrito = new Carrito('./data/carritos.json');

const carritoRouter = Router();

carritoRouter.post('/', async (req, res) => {
    try {

        const carrito = await miCarrito.createCarrito()

        res.status(201).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const carrito = await miCarrito.deleteCarrito( parseInt(id) );

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.get('/:id/productos', async (req, res) => {
    try {

        const { id } = req.params;

        const carrito = await miCarrito.getCarritoProductos( parseInt(id) );

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json( carrito );

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.post('/:id/productos', async (req, res) => {
    try {

        const { id } = req.params;

        const { productos } = req.body;

        if (!Object.keys(req.body).length) return res.status(400).json({
            error: 'no se han enviado productos'
        });

        if (productos?.lenght) return res.status(400).json({
            error: 'no se han especificado productos'
        });

        const productosEncontrados = await miProductos.getAllById( productos );

        if (productosEncontrados.error) return res.status( productosEncontrados.status ).json( productosEncontrados );

        const carrito = await miCarrito.addProducto(parseInt(id), productosEncontrados);

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(201).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.delete('/:id/productos/:id_product', async (req, res) => {
    try {

        const { id, id_product } = req.params;

        const carrito = await miCarrito.deleteProducto(parseInt(id), parseInt(id_product))

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = carritoRouter;