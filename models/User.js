// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// const db = require('../config/connection');

const db = require('../config/connection');

// Create a User class and extend the Model class

class User extends Model { }

// Call User.init and setup a couple colums/fields - email  & password as text strings

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 255],
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255] // Minimum length of 6 characters
    }
  }
},  {
  sequelize: db,
  modelName: 'user',
  // freezeTableName: true
});

// Export the User model
module.exports = User;