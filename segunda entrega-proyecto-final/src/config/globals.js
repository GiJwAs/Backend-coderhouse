require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    ADMIN: process.env.ADMIN || 'false',
    STORAGE: process.env.STORAGE || 'memoria'
}