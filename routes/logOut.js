const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    res.clearCookie('x-auth-token')
    res.clearCookie('user-id')
    res.clearCookie('Name')
    res.redirect('/')
});

module.exports = router