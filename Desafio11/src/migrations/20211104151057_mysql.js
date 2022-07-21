exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.string('title').notNullable();
        table.float('price').notNullable();
        table.string('thumbnail').notNullable();
        table.increments('id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
