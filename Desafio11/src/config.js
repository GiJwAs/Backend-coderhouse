const options = {
    mongodb: {
        host: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}

module.exports = options;