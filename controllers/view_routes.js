// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');
const Coo = require('../models/Coo');

// Block an auth page if user is already logged in
function isLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/');
  }

  next();
}

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
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['id', 'email']
    });

    req.user = user.get({ plain: true });
  }

  next();
}

// Add one test GET route at root - localhost:3333/
router.get('/', authenticate, async (req, res) => {
  const coos = await Coo.findAll({
    include: {
      model: User,
      as: 'author'
    }
  });

  res.render('landing', {
    user: req.user,
    coos: coos.map(c => c.get({ plain: true }))
  });
});

// GET route to show the register form
router.get('/register', isLoggedIn, authenticate, (req, res) => {
  // Render the register form template
  res.render('register_form', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});

// GET route to show the login form
router.get('/login', isLoggedIn, authenticate, (req, res) => {
  // Render the register form template
  res.render('login_form', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});

// Show Post a Coo page
router.get('/coo', isAuthenticated, authenticate, (req, res) => {
  res.render('coo_form', {
    user: req.user
  });

  req.session.errors = [];
});

// Export the router
module.exports = router;