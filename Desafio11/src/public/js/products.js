const renderProducts = products => {

    if ( products.length ) {

        const html = `
        <h1 class="text-danger font-monospace">
            Vista de Productos
        </h1>
        <table class="table table-dark table-striped table-hover align-middle table-borderless">

            <thead>
                <tr>
                    <th scope="col" class="text-warning"> Titulo </th>
                    <th scope="col" class="text-warning"> Precio </th>
                    <th scope="col" class="text-warning"> Foto </th>
                </tr>
            </thead>

            <tbody id="products" >
            </tbody>

        </table>
        `

        document.getElementById('vista-products').innerHTML = html;

        const htmls = products.map( product => {
            return(`
            <tr> 
                <td> ${product.title} </td>
                <td> ${product.price} </td>
                <td> 
                    <img src="${product.thumbnail}"
                        alt="${product.title}"
                        width="50"
                        height="50"
                    > 
                </td>
            </tr>
            `);
        }).join(' ');
    
        document.getElementById('products').innerHTML = htmls;
    } else {
        const html = `
        <h1 class="text-danger font-monospace">
            Vista de Productos
        </h1>
        <div class="alert alert-danger" role="alert">
            <h4><strong>No se encontraron productos</strong></h4>
        </div>
        `

        document.getElementById('vista-products').innerHTML = html;
    }

}

const addProduct = event => {
    event.preventDefault();

    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };

    socket.emit('new-product', product);

    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
}

const form = document.getElementById('form');

form.addEventListener('submit', addProduct);

socket.on('products', data => {
    renderProducts(data);
});
