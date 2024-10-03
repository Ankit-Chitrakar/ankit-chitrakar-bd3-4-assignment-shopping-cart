const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
let cart = require('./cart.js');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// Function for add new product in cart
const addProductInCart = (productId, name, price, quantity) => {
  let newProduct = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };

  cart.push(newProduct);
  return cart;
};

// Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  cart = addProductInCart(productId, name, price, quantity);
  res.json({ cartItems: cart });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let product = cart.find((product) => product.productId === productId);

  if (product) {
    product.quantity = quantity;
    res.json({ cartItems: cart });
  }
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter((product) => product.productId !== productId);

  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalCartQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  res.json({ totalQuantity: totalCartQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalCartPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  res.json({ totalPrice: totalCartPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
