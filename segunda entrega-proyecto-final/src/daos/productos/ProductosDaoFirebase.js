const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const { firestore } = require('firebase-admin');

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor (){
        super('productos')
    }

    async save( producto ){
        try {
            producto.codigo = 0;
            producto.timestamp = firestore.Timestamp.now();

            const response = this.create(producto);

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al guardar el producto:', error );
        }
    }
}

module.exports = ProductosDaoFirebase;