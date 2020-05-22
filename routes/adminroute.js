const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.post('/add-product', (req, res, next) => {
  // Add product Admin route
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/products', (req, res) => {
  //Get products Admin route
  req.user
    .getProducts()
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.patch('/edit-product/:productId', (req, res) => {
  // Edit product Admin route
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((result) => {
      result.title = updatedTitle;
      result.price = updatedPrice;
      result.imageUrl = updatedImageUrl;
      result.description = updatedDesc;
      return result.save();
    })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete('/delete-product/:productId', (req, res) => {
  // Delete product Admin route
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
