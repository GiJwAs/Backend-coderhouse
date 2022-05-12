const Contenedor = require('./desafio.js')

const run = async function () {
    let contenedor = new Contenedor('productos.txt')
    contenedor.save({
        title: "Remera",
        price: 3450,
        thumbnail: "https://www.camaronbrujo.com/media/catalog/product…/a/palmera---capuccino-3469-y-verde-ax-5402-h.jpg"
    })

    contenedor.save({
        title: "Pantalon",
        price: 10000,
        thumbnail: "https://www.camaronbrujo.com/media/catalog/product…d08d6e5fb8d27136e95/c/a/camaron_original_175_.jpg"
    })

    contenedor.save({
        title: "Canguro",
        price: 9500,
        thumbnail:"https://www.camaronbrujo.com/media/catalog/product…00/9df78eab33525d08d6e5fb8d27136e95/w/e/web-9.jpg"
    })
    console.log(contenedor.getById(1));
    console.log(contenedor.getById(5));
    console.log(contenedor.getAll());
    console.log(contenedor.deleteById(1));
    console.log(contenedor.deleteById(6));
    console.log(contenedor.getAll());
    contenedor.deleteAll();
    console.log(contenedor.getAll());
};

run();