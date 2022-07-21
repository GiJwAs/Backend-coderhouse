const env = 'development';
const knexfileSqlite3 = require('../knexfile_sqlite3');
const sqlite3 = knexfileSqlite3[env];

module.exports = sqlite3;