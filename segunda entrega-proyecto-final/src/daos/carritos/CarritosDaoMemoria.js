const ContenedorMemoria = require('../../contenedores/ContenedorMemoria');

class CarritosDaoMemoria extends ContenedorMemoria {

    constructor() {

        super('carritos');
        
        this.carritos = this.data;

    }

    createCarrito() {

        try {

        const carritos = this.carritos;

        const carrito = {
            id: 0,
            timestamp: new Date().toLocaleString(),
            productos: []
        };

        if ( !carritos.length ) {
            carrito.id = '1';
        } else {
            carrito.id = (parseInt(carritos[carritos.length - 1].id) + 1).toString();
        }

        carritos.push( carrito );

        this.write( carritos );

        return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al crear un nuevo carrito:', error );
        }
    }

    getAllCarritos() {
        try{

            return this.read();
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer los carritos:', error );
        }
    }

    getCarritoProductos( id ) {
        try {

            const carritos = this.read();

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            return carrito.productos;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al obtener un carrito:', error );
        }
    }

    deleteCarrito( id ) {
        try {

            const carritos = this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            carritos.splice( carritos.indexOf( carrito ), 1 );

            this.write( carritos );

            return carrito;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un carrito:', error );
        }
    }

    addProducto( id, productos ) {
        try {

            const carritos =this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            for (const producto of productos) {
                if ( producto?.error ) return { 
                    status: 404,
                    error: 'producto no encontrado' 
                };
                carrito.productos.push( producto );
            }

            this.write( carritos );

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al agregar un producto:', error );
        }
    }

    deleteProducto( id, productoId ) {
        try {

            const carritos = this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return {
                status: 404,
                error: 'carrito no encontrado'
            };

            const producto = carrito.productos.find( producto => producto.id === productoId );

            if( !producto ) return {
                status: 404,
                error: 'producto no encontrado'
            };

            carrito.productos.splice( carrito.productos.indexOf( producto ), 1 );

            this.write( carritos );

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un producto:', error );
        }
    }

}

module.exports = CarritosDaoMemoria;