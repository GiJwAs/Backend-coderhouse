const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {

        super('DB/carritos.json');
        
        this.carritos = this.readFile();

    }

    async createCarrito() {

        try {

        const carritos = await this.carritos;

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

        await this.writeFile( carritos );

        return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al crear un nuevo carrito:', error );
        }
    }

    async getAllCarritos() {
        try{

            return await this.readFile();
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer los carritos:', error );
        }
    }

    async getCarritoProductos( id ) {
        try {

            const carritos = await this.readFile();

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

    async deleteCarrito( id ) {
        try {

            const carritos = await this.carritos;

            const carrito = carritos.find( carrito => carrito.id === id );

            if ( !carrito ) return { 
                status: 404,
                error: 'carrito no encontrado' 
            };

            carritos.splice( carritos.indexOf( carrito ), 1 );

            await this.writeFile( carritos );

            return carrito;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un carrito:', error );
        }
    }

    async addProducto( id, productos ) {
        try {

            const carritos = await this.carritos;

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

            await this.writeFile( carritos );

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al agregar un producto:', error );
        }
    }

    async deleteProducto( id, productoId ) {
        try {

            const carritos = await this.carritos;

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

            await this.writeFile( carritos );

            return carrito;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al borrar un producto:', error );
        }
    }

}

module.exports = CarritosDaoArchivo;
