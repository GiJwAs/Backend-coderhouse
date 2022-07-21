// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
        filename:'./DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  }

};
