const { User } = require('../models/user');
const { Purchase } = require('../models/purchase');
const express = require('express');
const { Product } = require('../models/product');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth)
router.use(admin)


router.get('/panel', async (req, res) => {
    const user = await User.findOne({ _id: req.cookies['user-id']});
    if (!user) return res.status(400).send('Access Denied. you are not Signed In');
    res.render('panel', { loggedIn: req.logged, admin: req.admin, user });
})

router.get('/panel/purchases', async (req, res) => {
    const user = await User.findOne({ _id: req.cookies['user-id']});
    if (!user) return res.status(400).send('Access Denied. you are not Signed In');
    const purchases = await Purchase.find({ 'user._id': req.cookies['user-id'] })
    res.render('userPurchase', { purchases })
});

router.get('/panel/products', async (req, res) => {
    const user = await User.findOne({ _id: req.cookies['user-id']});
    if (!user) return res.status(400).send('Access Denied.');
    const products = await Product.find();
    res.render('panelProducts', { products })
});

module.exports = router