
const express = require('express');

const app = express();

const PORT = 3002;


app.use(express.json());


let products = [];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i,
        name: `Product ${i}`,
        price: i * 100,
        category: `Category ${(i % 5) + 1}`,
        stock: i * 2
    });
}


app.get('/', (req, res) => {
    res.send('Welcome to Product REST API');
});


app.get('/products', (req, res) => {
    res.json(products);
});


app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    res.json(product);
});


app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    };

    products.push(newProduct);

    res.status(201).json({
        message: 'Product added successfully',
        product: newProduct
    });
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    res.json({
        message: 'Product updated successfully',
        product: product
    });
});


app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: 'Product deleted successfully',
        product: deletedProduct[0]
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});