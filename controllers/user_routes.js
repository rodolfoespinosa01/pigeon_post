const router = require('express').Router();

// Import the User model
const User = require('../models/User')

// http://localhost:3333/auth/register
// Post request route that retrieves the form data(email, password) and creates a new user in the database, using our User model

router.post('/register', async (req, res) => {
  try {
    await User.create(req.body);


    res.redirect('/');
    
  } catch (error) {
    res.redirect('/');
  }
});

// Export the router
module.exports = router;


// The route will respond with a data object with a property of message that says “User added successfully!”
