const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users');
const auth = require('./routes/auth');
const purchases = require('./routes/purchases');
const logOut = require('./routes/logOut');
const panel = require('./routes/panel');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const { User } = require('./models/user');
const logged = require('./middleware/auth');

const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(methodOverride('_method'))



app.set('view engine', 'ejs');

app.get('/', logged, async (req, res) => {
  const user = await User.findById(req.cookies['user-id']);
  res.render('index', { loggedIn: req.logged , user });
});





app.use('/', products);
app.use('/', users);
app.use('/', auth);
app.use('/', purchases);
app.use('/', logOut)
app.use('/', panel);

require('./startup/db')()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));