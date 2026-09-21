const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary product data
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Mouse",
    price: 800,
    category: "Accessories"
  }
];

// GET - Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST - Add a product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
    category: category
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// DELETE - Delete a product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  products = products.filter((product) => product.id !== id);

  res.json({
    message: "Product deleted successfully"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});