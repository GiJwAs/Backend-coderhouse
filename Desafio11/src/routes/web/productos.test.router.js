const { Router } = require('express');

const generateProducts = require('../../utils/generateProducts');

const productosTestRouter = Router();

productosTestRouter.get('/', (req, res) => {
    const productos = generateProducts(5);
    res.render( 'pages/vista', { productos } );
})

module.exports = productosTestRouter;