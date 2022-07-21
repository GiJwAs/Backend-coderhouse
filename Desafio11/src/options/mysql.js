const env = 'development';
const knexfileMysql = require('../knexfile_mysql');
const mysql = knexfileMysql[env];

module.exports = mysql;