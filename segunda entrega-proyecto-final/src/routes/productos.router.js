const { Router } = require('express');

const isAdmin = require('../middlewares/isAdmin');
const { ProductosDao } = require('../daos/index');

const miProductos = new ProductosDao();

const productosRouter = Router();

productosRouter.get('/', async (req, res) => {
    try{
        const productos = await miProductos.getAll();
        res.status(200).json( productos );
    } catch( err ) {
        res.status(500).json({
            error: err.message
        });
    }
});

productosRouter.get('/:id', async (req, res) => {
    try{
    const id = req.params.id;

    const producto = await miProductos.getById(id);

    if ( producto.error ) return res.status( producto.status ).json( producto )
    else res.status(200).json( producto );
    } catch( err ) {
        res.status(500).json({
            error: err.message
        });
    }
});

productosRouter.post('/', isAdmin, async (req, res) => {
    try {
    const { 
        nombre, 
        descripcion, 
        foto,
        precio,
        stock } = req.body;

    if (!Object.keys(req.body).length) return res.status(400).json({
        error: 'no se ha enviado parametros para actualizar'
    });
    
    const save = await miProductos.save( 
        { 
            nombre, 
            descripcion, 
            foto,
            precio,
            stock
        } 
    );

    if( save.error ) res.status( save.status ).json( save );
    else res.status(201).json( save );

    } catch( err ) {
        res.status(500).json({
            error: err.message
        });
    }
});

productosRouter.put('/:id', isAdmin, async (req, res) => {
    try {
    const id = req.params.id;

    const { 
        nombre, 
        descripcion, 
        foto,
        precio,
        stock } = req.body;

    if (!Object.keys(req.body).length) return res.status(400).json({
        error: 'no se ha enviado producto'
    });

    const productoUpdate = await miProductos.update( id, {         
        nombre, 
        descripcion, 
        foto,
        precio,
        stock 
    });

    if ( productoUpdate.error ) return res.status( productoUpdate.status ).json( productoUpdate )
    else res.status(200).json( productoUpdate );

    } catch( err ) {
        res.status(500).json({
            error: err.message
        });
    }
});

productosRouter.delete('/:id', isAdmin, async (req, res) => {
    try {
    const id = req.params.id;

    const deleteProducto = await miProductos.deleteById(id);

    if( deleteProducto.error ) res.status(deleteProducto.status).json( deleteProducto );
    else res.status(200).json( deleteProducto );

    } catch( err ) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = {
    miProductos,
    productosRouter
};