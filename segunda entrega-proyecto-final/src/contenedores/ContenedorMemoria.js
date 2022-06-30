const DB = {};

class ContenedorMemoria {
    constructor( memoria ) {
        this.database = DB;
        this.collection = memoria;
        this.data = [];
    }

    write( data ) {
        try{
            this.database[this.collection] = data;
            return data;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al guardar el archivo:', error );
        }
    }

    read() {
        try{
            const data = this.database[this.collection];
            if (!data) return [];
            return data;
        } catch ( error ) {
            throw new Error( 'Ocurrio un error al leer el archivo:', error );
        }
    }
}

module.exports = ContenedorMemoria;