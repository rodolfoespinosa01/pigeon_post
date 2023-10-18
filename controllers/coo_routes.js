const router = require('express').Router();

const User = require('../models/User');
const Coo = require('../models/Coo');

// Block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

// Attach user data to the request if they are logged in
async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if (user_id) {
    const user = await User.findByPk(req.session.user_id);

    req.user = user;
  }

  next();
}

// Post a Coo
router.post('/coo', isAuthenticated, authenticate, async (req, res) => {
  try {
    const coo = await Coo.create(req.body);

    await req.user.addCoo(coo);

    res.redirect('/');
  } catch (err) {
    req.session.errors = error.errors.map(errObj => errObj.message);
    res.redirect('/coo');
  }
});

module.exports = router;