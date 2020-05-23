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
      if (!product) {
        res.status(404).send();
      } else {
        res.status(200).send(product);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/cart', (req, res) => {
  //Add to cart shop route
  const prodId = req.body.id;
  let fetchedCart;
  let newQuantity = 1;

  //TO ADD VALIDATION FOR INCOMING req.body.id
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => res.send(err));
});

router.get('/cart', (req, res) => {
  //Get User cart
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.send(products);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/cart-delete-item', (req, res) => {
  res.send('Delete cart item Shop route!');
});

router.post('/create-order', (req, res) => {
  res.send('Create order Shop route!');
});

router.get('/orders', (req, res) => {
  res.send('Get orders Shop route!');
});

module.exports = router;
