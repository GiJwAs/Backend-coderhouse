const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const { firestore } = require('firebase-admin');

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor (){
        super('carritos');
    }

    async createCarrito(){
        try {
            const carrito = {
                timestamp: firestore.Timestamp.now(),
                productos: []
            }

            const response = await this.create( carrito );

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al crear un nuevo carrito:', error );
        }
    }

    async getAllCarritos() {
        try{

            return await this.getAll();
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer los carritos:', error );
        }
    }

    async getCarritoProductos( id ){
        try {
            const carrito = await this.getById( id );

            if ( carrito?.error ) return { 
                status: carrito.status,
                error: 'carrito no encontrado' 
            };

            return carrito.productos;
        } catch (error) {
            throw new Error( 'Ocurrio un error al obtener los productos del carrito:', error );
        }
    }

    async addProducto(id, productos){
        try {
            const carritoProductos = await this.getCarritoProductos( id );

            if ( carritoProductos?.error ) return { 
                status: carritoProductos.status,
                error: 'carrito no encontrado' 
            };

            for (const producto of productos) {
                if ( producto?.error ) return { 
                    status: productos.status,
                    error: 'producto no encontrado' 
                };

                carritoProductos.push( producto );
            }

            await this.update(id, { productos: carritoProductos });

            return carritoProductos;
        } catch (error) {
            throw new Error( 'Ocurrio un error al agregar un producto:', error );
        }
    }

    async deleteProducto( id, productoId ) {
        try {
            const carritoProductos = await this.getCarritoProductos( id );

            if ( carritoProductos?.error ) return { 
                status: carritoProductos.status,
                error: 'carrito no encontrado' 
            };

            const producto = carritoProductos.find( producto => producto.id === productoId );

            if( !producto ) return {
                status: 404,
                error: 'producto no encontrado'
            };

            carritoProductos.splice( carritoProductos.indexOf( producto ), 1 );

            const response = await this.update(id, { productos: carritoProductos });

            return response;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un producto:', error );
        }
    }

    async deleteCarrito( id ){
        try {
            const response = await this.deleteById( id );

            if ( response?.error ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar un carrito:', error );
        }
    }

}

module.exports = CarritosDaoFirebase;