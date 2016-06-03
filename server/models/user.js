'use strict';

const bcrypt = require('bcrypt');

const encryptPassword = function (user, options, callback) {
  return bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return callback(new Error("Couldn't save new user! - Password encryption error"));
    }
    user.password = hash;
    return callback(err, user);
  });
};

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      username: {
        type:     DataTypes.STRING,
        unique:   true,
        validate: {
          notEmpty: true,
          len:      [4, 255]
        }
      },
      email: {
        type:     DataTypes.STRING,
        unique:   true,
        validate: {
          notEmpty: true,
          isEmail:  true,
          len:      [5, 255]
        }
      },
      password: {
        type:     DataTypes.STRING,
        validate: {
          notEmpty: true,
          len:      [6, 255]
        }
      }
    },
    {
      underscored: true,
      tableName:   'users',
      hooks:       {
        beforeCreate: encryptPassword,
        beforeUpdate: encryptPassword
      },
      instanceMethods: {
        checkPassword: function (plain_password, callback) {
          return bcrypt.compare(plain_password, this.password, function (err, res) {
            if (err || (res === false)) {
              return callback(err, false);
            }
            return callback(null, true);
          });
        }
      }
    }
  );

  return User;
};
