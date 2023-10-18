// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const { hash, compare } = require('bcrypt');

const Coo = require('./Coo');

// Create a User class and extend the Model class
class User extends Model { }

// Call User.init and setup a couple columns/fields - email & password as text strings
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'That email address is already in use.'
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters in length.'
      }
    }
  }
}, {
  modelName: 'user',
  // Connection object
  sequelize: db,
  hooks: {
    async beforeCreate(user) {
      user.password = await hash(user.password, 10);

      return user;
    }
  }
});

User.prototype.validatePass = async function (form_password) {
  const is_valid = await compare(form_password, this.password);

  return is_valid;
}

User.hasMany(Coo, { as: 'coos', foreignKey: 'author_id' });
Coo.belongsTo(User, { as: 'author', foreignKey: 'author_id' });

// Export the User model
module.exports = User;