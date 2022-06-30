const admin = require('firebase-admin');
const options = require('../config');


class ContenedorFirebase {

    constructor( collection ){
        this.init();
        this.db = admin.firestore();
        this.query = this.db.collection( collection );
    }

    init(){
        try {
            if(!admin.apps.length && !this.conexion){
                this.conexion = admin.initializeApp({credential: admin.credential.cert(options.firestore)})
            }
        } catch (error) {
            throw new Error( 'Ocurrio un error al conectar:', error );
        }
    }

    async create( object ){
        try {
            const response = await this.query.add( object );

            const item = this.getById(response._path.segments[1])

            return item;
        } catch (error) {
            throw new Error( 'Ocurrio un error al crear:', error );
        }
    }

    async getAll(){
        try {
            const snapshot = await this.query.get();
            const docs = snapshot.docs;

            const response = docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            }))

            return response;
        } catch (error) {
            throw new Error( 'Ocurrio un error al obtener:', error );
        }
    }

    async getById( id ){
        try {
            const doc = this.query.doc(id);
            const item = await doc.get();

            if ( !item.data() ) return {
                status: 404,
                error: 'no encontrado'
            };
            
            const response = {
                id: item.id,
                ...item.data()
            }

            return response;
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
            throw new Error( 'Ocurrio un error al obtener todos por id:', error );
        }
    }

    async update( id, element ){
        try {
            const doc = this.query.doc(id);
            const item = await doc.get();

            if ( !item.data() ) return {
                status: 404,
                error: 'no encontrado'
            };

            await doc.update( element );

            const itemUpdated = await this.getById( id );
            
            return itemUpdated;
        } catch (error) {
            throw new Error( 'Ocurrio un error al actualizar:', error );
        }
    }

    async deleteById( id ){
        try {
            const doc = this.query.doc(id);
            const item = await this.getById(id);
            
            if ( !item ) return {
                status: 404,
                error: 'No encontrado'
            };

            await doc.delete();
            
            return item;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar:', error );
        }
    }

    async deleteAll(){
        try {
            const items = await this.getAll();

            for(const item of items ){
                await this.deleteById( item.id );
            }

            const itemsDeleted = await this.getAll();
            return itemsDeleted;
        } catch (error) {
            throw new Error( 'Ocurrio un error al borrar todos:', error );
        }
    }
}

module.exports = ContenedorFirebase;