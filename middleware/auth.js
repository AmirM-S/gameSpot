const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.cookies['x-auth-token'];
  if (!token) {
    req.logged= false;

  } else {
    try {
      const decoded = jwt.verify(token, '1235');
      req.user = decoded;
      req.logged = true;
    } catch (ex) {
      res.status(400).send('Invalid token');      
    }
  }
  next();
  };
