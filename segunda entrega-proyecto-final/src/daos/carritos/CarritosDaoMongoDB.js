const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");

class CarritosDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super('carritos', {
            productos: { type: Array, required: true, default: [] },
            timestamp: { type: Date, default: Date.now }
        });
    }

    async createCarrito(){
        try {
            const carrito = {
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

            const response = await this.update(id, { productos: carritoProductos });

            return response;
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

            const producto = carritoProductos.find( producto => producto._id.toString() === productoId );

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
            const response = this.deleteById( id );
            
            if ( response?.error ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar un producto:', error );
        }
    }

};

module.exports = CarritosDaoMongoDB;