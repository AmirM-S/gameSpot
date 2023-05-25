const { Product, validateProduct } = require('../models/product');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.use(auth)
// Render the products page with a list of products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('products', { loggedIn: req.logged, products });
});

// Render a single product page
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('product', { loggedIn: req.logged, product });
});


// Render a page fo add product
router.get('/panel/addProduct', async (req, res) => {
  res.render('add');
});

// Add a new product
router.post('/panel/addProduct', validate(validateProduct), async (req, res) => {
  const product = new Product({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    price: req.body.price,
    numberInStock: req.body.numberInStock
  });
  await product.save()
  res.redirect('/panel/products')
});

// Render a page to update a product
router.get('/panel/products/:id/update', async (req, res) => {
      const product = await Product.findById(req.params.id);
      res.render('update', { product });
  });
  
  // Update an existing product
  router.put('/panel/products/:id/update', validate(validateProduct), async (req, res) => {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.redirect('/panel/products');
  });

// Delete a product
router.delete('/panel/products/:id', async (req, res) => {
  await Product.findByIdAndRemove(req.params.id);
  res.redirect('/panel/products');
});

module.exports = router;


