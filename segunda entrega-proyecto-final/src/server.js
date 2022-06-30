const express = require('express');

const { productosRouter } = require('./routes/productos.router');
const { carritoRouter } = require('./routes/carrito.router');

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.use('/api/productos', productosRouter);

app.use('/api/carrito', carritoRouter);

app.use( '*', (req, res) => {
    res.status(404).json({ 
        error: -2,
        descripcion: `ruta '${ req.originalUrl }' método '${ req.method }' no implementada`
    });
});


module.exports = app;