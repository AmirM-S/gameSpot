const { User, validateUser } = require('../models/user');
const validate = require('../middleware/validate');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('user', { errorMessage: null });
});

router.post('/signup', validate(validateUser), async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email });
    if (user) {
        return res.render('user', { errorMessage: 'User is already registerd'})
    }
    user = new User({ name, email, password});

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    res.cookie('x-auth-token', token);
    res.cookie('user-id', user._id);
    res.cookie('Name', user.name)
    console.log('loged in successfully')
    res.redirect('/')
});

router.get('/panel/user/edit', async (req, res) => {
    const user = await User.findById(req.cookies['user-id'])
    res.render('editInfo', { user });
});

router.put('/panel/user/edit', validate(validateUser), async (req, res) => {
    const user = await User.findByIdAndUpdate(req.cookies['user-id'], req.body, { new: true });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.redirect('/panel');
});

module.exports = router;