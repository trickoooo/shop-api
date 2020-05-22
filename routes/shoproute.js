const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
  //Index Shop route
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/products', (req, res) => {
  //Get products Shop route
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    }); 
});

router.get('/products/:productId', (req, res) => {
  //Get product details Shop route
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      if(!product) {
        res.status(404).send();
      } else {
        res.status(200).send(product);
      }
    })
    .catch(err => {
      res.send(err);
    })
});

router.post('/create-order', (req, res) => {
  res.send('Create order Shop route!');
});

router.get('/orders', (req, res) => {
  res.send('Get orders Shop route!');
});

router.post('/cart', (req, res) => {
  res.send('Add to Cart Shop route!');
});

router.get('/cart', (req, res) => {
  res.send('Get cart items Shop route!');
});

router.delete('/cart-delete-item', (req, res) => {
  res.send('Delete cart item Shop route!');
});

module.exports = router;
