const { Purchase } = require('../models/purchase');
const { User } = require('../models/user');
const { Product } = require('../models/product');

const express = require('express');
const router = express.Router();

router.post('/product/:id/purchase', async (req, res) => {
    try {
      const user = await User.findById(req.cookies['user-id']);
      const product = await Product.findById(req.params.id);
  
      let purchase = await Purchase.findOne({
        'user.email': user.email,
        'product.title': product.title,
      });
  
      if (purchase) {
        purchase.quantity += 1;
        await purchase.save();
      } else {
        purchase = new Purchase({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          product: {
            _id: product._id,
            title: product.title,
          },
          quantity: 1,
        });
        await purchase.save();
      }
  
      await Product.updateOne({ _id: req.params.id }, { $inc: { numberInStock: -1 } });
  
      res.render('purchase', { product });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        console.error('Duplicate key error:', error.message);
        // Handle the error gracefully (e.g., show an error message to the user)
        res.status(500).send('Duplicate key error occurred.');
      } else {
        // Other errors
        console.error('Error:', error);
        // Handle other errors accordingly
        res.status(500).send('An error occurred.');
      }
    }
  });

module.exports = router;
