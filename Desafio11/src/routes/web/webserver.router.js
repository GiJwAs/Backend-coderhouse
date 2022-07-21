const { Router } = require('express');

const { ProductosDao } = require('../../daos/index');

const { saveProduct, getAllProducts } = ProductosDao;

const { isAuthWeb } = require('../../utils/auth');

const webServerRouter = Router();

webServerRouter.get('/home', isAuthWeb, (req, res) => {
    res.render( 'pages/index', { user: { name: req.user.email } } );
});

webServerRouter.post('/productos', async (req, res) => {
    const { 
        title, 
        price, 
        thumbnail } = req.body;
    
    const producto = {
        title, 
        price, 
        thumbnail
    }

    const save = await saveProduct(producto);

    if( save.error ) res.status(save.status).json( save );
    else res.redirect( '/home' );
});

webServerRouter.get('/vista', isAuthWeb, async (req, res) => {
    const productos = await getAllProducts();

    res.render( 'pages/vista', { productos } );
});

module.exports = webServerRouter;