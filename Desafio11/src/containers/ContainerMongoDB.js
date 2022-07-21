const mongoose = require("mongoose");

const { mongodb } = require('../config');

const { model, Schema } = mongoose;

class ContainerMongoDB {

    constructor( collection, schema ) {
        this.collection = model(collection, new Schema(schema));
        this.init();
    }

    async init(){
        try {
            if(!this.conexion){
                this.conexion = await mongoose.connect(mongodb.host, mongodb.options);
            }
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async create(object){
        try {
            const created = await this.collection.create(object);
            return created;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readAll(){
        try {
            const list = await this.collection.find({}).lean();
            
            return list;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readByEmail(email){
        try {
            const item = await this.collection.find({ email }).lean();
            
            return item;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async readById(id){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid'

            const item = await this.collection.findOne({ _id: id }).lean();

            return item;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async updateById({id, object}){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid';
            
            const updated = await this.collection.updateOne({ _id: id }, { $set: object });

            if(updated.matchedCount === 0) throw 'Error al actualizar'

            const itemUpdated = await this.readById(id);
            return itemUpdated;

        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async deleteById(id){
        try {
            const isValid = mongoose.isValidObjectId(id);

            if(!isValid) throw 'id is not valid';
            
            const itemDeleted = await this.readById(id);

            const deleted = await this.collection.deleteOne({ _id: id });

            return itemDeleted;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

    async deleteAll(){
        try {
            const deleted = await this.collection.deleteMany({});
            return deleted;
        } catch (error) {
            throw new Error('Ocurrio un error inesperado:', error);
        }
    }

}

module.exports = ContainerMongoDB;