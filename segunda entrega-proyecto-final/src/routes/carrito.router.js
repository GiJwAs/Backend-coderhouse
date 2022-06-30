const { Router } = require('express');

const { CarritoDao } = require('../daos/index');
const { miProductos } = require('./productos.router');

const miCarrito = new CarritoDao();

const carritoRouter = Router();

carritoRouter.get('/', async (req, res) => {
    try {
        const carrito = await miCarrito.getAllCarritos()

        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

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

        const carrito = await miCarrito.deleteCarrito( id );

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

        const carrito = await miCarrito.getCarritoProductos( id );

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

        const carrito = await miCarrito.addProducto(id, productosEncontrados);

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

        const carrito = await miCarrito.deleteProducto(id, id_product)

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = {
    miCarrito,
    carritoRouter
};