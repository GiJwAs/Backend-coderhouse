const knex = require('knex');

class ContainerSQL {

    constructor( config, table ) {
        this.config = config;
        this.knex = knex( this.config );
        this.table = table;
    }

    async insertTable( object ){
        try {
            await this.knex( this.table ).insert( object );
        } catch(err) {
            console.log(err);
        }
    }

    async selectAll(){
        try {
            const data = await this.knex.from( this.table ).select('*');

            if (!data) return [];

            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async selectById(id){
        try {
            const data = await this.knex.from( this.table )
                                    .select('*')
                                    .where( { id } );

            if(!data) return {
                status: 404,
                error: 'no encontrado'
            }

            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async updateById(id, object){
        try {
            await this.knex.from( this.table )
                    .where( { id } )
                    .update( object );

            const data = await this.selectById( id );

            if(!data) return {
                status: 404,
                error: 'no encontrado'
            }

            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async deleteById(id){
        try {
            const data = await this.selectById( id );

            if(!data) return {
                status: 404,
                error: 'no encontrado'
            }

            await this.knex.from(this.table)
                        .where( { id } )
                        .del();

            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async deleteAll(){
        try {
            await this.knex.from(this.table)
                        .del('*');
                        
            const data = await this.selectAll();

            return data;
        } catch(err) {
            console.log(err);
        }
    }

}

module.exports = ContainerSQL;