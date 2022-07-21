exports.up = function(knex) {
    return knex.schema.createTable('messages', table => {
        table.string('email').notNullable();
        table.string('text').notNullable();
        table.timestamp('fyh').defaultTo(knex.fn.now())
        table.increments('id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
