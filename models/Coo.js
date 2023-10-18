const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Coo extends Model { }

Coo.init({
  text: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 3,
        msg: 'Your coo message must be at least 3 characters in length.'
      }
    }
  }
}, {
  modelName: 'user_coos',
  freezeTableName: true,
  sequelize: db
});

module.exports = Coo;