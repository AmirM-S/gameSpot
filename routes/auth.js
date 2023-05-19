const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth', { errorMessage: null });
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        return res.render('auth', { errorMessage: 'invalid email or password'})
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.render('auth', { errorMessage: 'invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.cookie('x-auth-token', token);
    res.cookie('user-id', user._id);
    res.cookie('Name', user.name)
    res.redirect('/')
});

module.exports = router;