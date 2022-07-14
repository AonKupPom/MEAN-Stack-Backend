const jwt = require('jsonwebtoken');

module.exports = (req,  res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(!token) {
    res.status(403).send("A token is required for authentication.")
  }

  try {
    const decoded = jwt.verify(token, 'qightysdrvp');
    req.user = decoded;
  }
  catch(err){
    res.status(401).json({loggedIn: false});
  }

  return next();
}
