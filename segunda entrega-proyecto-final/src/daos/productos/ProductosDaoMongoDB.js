const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");

class ProductosDaoMongoDB extends ContenedorMongoDB{
    constructor(){
        super('productos', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            foto: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
            codigo: { type: Number, required: true, default: 0 },
            timestamp: { type: Date, default: Date.now }
        });
    }

    async save( producto ){
        try {
            const response = this.create(producto);

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al guardar el producto:', error );
        }
    }
};

module.exports = ProductosDaoMongoDB;