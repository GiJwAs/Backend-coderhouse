const mongoose = require('mongoose');
const options = require('../config');

const { model, Schema } = mongoose;

class ContenedorMongoDB {
    constructor( collection, schema ){
        this.collection = model(collection, new Schema(schema));
        this.init();
    }

    async init(){
        try {
            if(!this.conexion){
                this.conexion = await mongoose.connect(options.mongodb.host, options.mongodb.options);
            }   
        } catch (error) {
            throw new Error( 'Ocurrio un error al conectar:', error );
        }
    }

    async create( object ){
        try {
            const created = await this.collection.create( object );
            return created;
        } catch (error) {
            throw new Error( 'Ocurrio un error al crear:', error );
        }
    }

    async getAll(){
        try {
            const list = await this.collection.find({});

            return list;
        } catch (error) {
            throw new Error( 'Ocurrio un error al obtener:', error );
        }
    }

    async getById( id ){
        try {
            const validate = mongoose.isValidObjectId(id);
            if(!validate) return {
                status: 400,
                error: 'el id no es valido'
            };

            const item = await this.collection.findOne({ _id: id });
            if(!item) return {
                status: 404,
                error: 'no encontrado'
            };

            return item;
        } catch (error) {
            throw new Error( 'Ocurrio un error al obtener por id:', error );
        }
    }

    async getAllById( elements ){
        try {
            const elementsIds = elements.map( element => element.id );

            const itemsFound = [];

            for (const elementId of elementsIds) {
                if( !elementId ) return {
                    status: 400,
                    error: 'no se recibio un id'
                }
                
                const validate = mongoose.isValidObjectId(elementId);
                if(!validate) return {
                    status: 400,
                    error: 'el id no es valido'
                };

                const element = await this.getById( elementId );

                if( element?.error ) return {
                    status: 404,
                    error: `el id ${ elementId } no existe`
                }

                itemsFound.push( element );
            }
            if ( !itemsFound.length ) return { 
                status: 404,
                error: 'no se encontraron' 
            };

            return itemsFound;
        } catch (error) {
            throw new Error( 'Ocurrio un error al obtener por id:', error );
        }
    }

    async update( id, element ){
        try {
            const validate = mongoose.isValidObjectId(id);
            if(!validate) return {
                status: 400,
                error: 'el id no es valido'
            };

            const item = await this.collection.updateOne({ _id: id }, { $set: element });
            if(item.matchedCount === 0) return {
                status: 404,
                error: 'no encontrado'
            };

            const itemUpdated = await this.getById(id);
            return itemUpdated;
        } catch (error) {
            throw new Error( 'Ocurrio un error al actualizar:', error );
        }
    }

    async deleteById( id ){
        try {
            const validate = mongoose.isValidObjectId(id);
            if(!validate) return {
                status: 400,
                error: 'el id no es valido'
            };

            const itemDeleted = await this.getById(id);

            const item = await this.collection.deleteOne({ _id: id })
            if(item.deletedCount === 0) return {
                status: 404,
                error: 'no encontrado'
            };


            return itemDeleted;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar:', error );
        }
    }

    async deleteAll() {
        try {
            const item = await this.collection.deleteMany({})
            return item;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar todos:', error );
        }
    }
}

module.exports = ContenedorMongoDB;