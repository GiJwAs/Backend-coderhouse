const faker = require('faker');

faker.locale = 'es';

const generateProduct = () => ({
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.business()
})

const generateProducts = (quantity = 5) => {
    const products = [];
    for (let i = 0; i < quantity; i++) {
        products.push(generateProduct());
    }
    return products;
}

module.exports = generateProducts;
