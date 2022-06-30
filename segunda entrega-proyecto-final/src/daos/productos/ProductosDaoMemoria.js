const ContenedorMemoria = require('../../contenedores/ContenedorMemoria');

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {

        super('productos');
        
        this.productos = this.data;
        
    }

    save( producto ) {

        try {
            
            for (const key in producto) {
                if( !producto[key] ) return { 
                    status: 400,
                    error: `${key} no definida` 
                };
            }

            const productos = this.productos;
            
            if ( !productos.length ) {
                producto.id = '1';
            } else {
                producto.id = (parseInt(productos[productos.length - 1].id) + 1).toString();
            }

            producto.codigo = producto.id;

            producto.timestamp = new Date().toLocaleString();
            
            productos.push( producto );
            
            this.write( productos );

            return producto;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al guardar el producto:', error );
        }

    }

    getById( id ) {

        try{

        const productos = this.read();

        const producto = productos.find( producto => producto.id === id );

        if ( !producto ) return { 
            status: 404,
            error: 'producto no encontrado' 
        };

        return producto;

        } catch( error ) {
            throw new Error( 'Ocurrio un error al encontrar el producto:', error );
        }

    }

    getAllById( productos ) {

        try{

            const productosId = productos.map( producto => producto.id );

            const productosEncontrados = [];

            for (const productoId of productosId) {

                if( !productoId ) return {
                    status: 400,
                    error: 'no se recibio un id de un producto'
                }
                
                const producto = this.getById( productoId );

                if( producto.error ) return {
                    status: 404,
                    error: `el producto con el id ${ productoId } no existe`
                }

                productosEncontrados.push( producto );
            }

            if ( !productosEncontrados.length ) return { 
                status: 404,
                error: 'no se encontraron productos' 
            };

            return productosEncontrados;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al obtener los productos:', error );
        }

    }

    getAll() {
        
        try{

            return this.read();
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer productos:', error );
        }

    }

    update( id, productoActualizado ) {

        try{

            const productos = this.productos;

            const producto = productos.find( producto => producto.id === id );
            if ( !producto ) return { 
                status: 404,
                error: 'producto no encontrado' 
            };

            const productoIndex = productos.indexOf( producto );
            
            const validateAllProp = Object.values( productoActualizado )
                    .every( value => value === undefined );
            if( validateAllProp ) return { 
                status: 400,
                error: 'no se recibio ninguna propiedad para actualizar el producto' 
            };

            for (const key in producto) {
                if(productoActualizado[key]){
                    producto[key] = productoActualizado[key];
                }
            }

            productos[productoIndex] = producto;

            this.write( productos );

            return productos[productoIndex];

        } catch( error ) {
            throw new Error( 'Ocurrio un error al actualizar el producto:', error );
        }

    }

    deleteById( id ) {

        try {
        
        const productos = this.productos;
        
        const producto = productos.find( producto => producto.id === id );
        
        if (!producto) return {
            status: 404,
            error: 'el producto que intentas eliminar no existe'
        };
        
        productos.splice( productos.indexOf( producto ), 1 );
        
        this.write( productos );

        return producto;
        
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al eliminar el producto:', error );
        }

    }

    deleteAll() {

        try{

        this.productos = [];

        this.write( this.productos );

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al eliminar todos los productos:', error );
        }

    }

}

module.exports = ProductosDaoMemoria;