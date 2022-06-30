const ContenedorArchivo = require('../../contenedores/ContenedorArchivo');

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {

        super('DB/productos.json');
        
        this.productos = this.readFile();
        
    }

    async save( producto ) {

        try {
            
            for (const key in producto) {
                if( !producto[key] ) return { 
                    status: 400,
                    error: `${key} no definida` 
                };
            }

            const productos = await this.productos;
            
            if ( !productos.length ) {
                producto.id = '1';
            } else {
                producto.id = (parseInt(productos[productos.length - 1].id) + 1).toString();
            }

            producto.codigo = producto.id;

            producto.timestamp = new Date().toLocaleString();
            
            productos.push( producto );
            
            await this.writeFile( productos );

            return producto;

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al guardar el producto:', error );
        }

    }

    async getById( id ) {

        try{

        const productos = await this.readFile();

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

    async getAllById( productos ) {

        try{

            const productosId = productos.map( producto => producto.id );

            const productosEncontrados = [];

            for (const productoId of productosId) {

                if( !productoId ) return {
                    status: 400,
                    error: 'no se recibio un id de un producto'
                }
                
                const producto = await this.getById( productoId );

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

    async getAll() {
        
        try{

            return await this.readFile();
            
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer productos:', error );
        }

    }

    async update( id, productoActualizado ) {

        try{

            const productos = await this.productos;

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

            await this.writeFile( productos );

            return productos[productoIndex];

        } catch( error ) {
            throw new Error( 'Ocurrio un error al actualizar el producto:', error );
        }

    }

    async deleteById( id ) {

        try {
        
        const productos = await this.productos;
        
        const producto = productos.find( producto => producto.id === id );
        
        if (!producto) return {
            status: 404,
            error: 'el producto que intentas eliminar no existe'
        };
        
        productos.splice( productos.indexOf( producto ), 1 );
        
        await this.writeFile( productos );

        return producto;
        
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al eliminar el producto:', error );
        }

    }

    async deleteAll() {

        try{

        this.productos = [];

        await this.writeFile( this.productos );

        } catch ( error ) {
            throw new Error( 'Ocurrio un error al eliminar todos los productos:', error );
        }

    }

}

module.exports = ProductosDaoArchivo;