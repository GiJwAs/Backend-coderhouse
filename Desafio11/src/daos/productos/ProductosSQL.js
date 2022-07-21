const ContainerSQL = require('../../containers/ContainerSQL');

const mysql = require('../../options/mysql');

const products = new ContainerSQL(mysql, 'products');

const saveProduct = async product => {
    const data = await products.insertTable(product);
    return data;
}

const getAllProducts = async () => {
    const data = await products.selectAll();
    return data;
}

const getByIdProducts = async id => {
    const data = await products.selectById(id);
    return data;
}

const updateByIdProduct = async (id, product) => {
    const data = await products.updateById(id, product);
    return data;
}

const deleteByIdProduct = async id => {
    const data = await products.deleteById(id);
    return data;
}

const deleteAllProducts = async () => {
    const data = await products.deleteAll();
    return data;
}

module.exports = {
    saveProduct,
    getAllProducts,
    getByIdProducts,
    updateByIdProduct,
    deleteByIdProduct,
    deleteAllProducts
}