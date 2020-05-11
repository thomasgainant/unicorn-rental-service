'use strict';

/* ORM init */

const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('unicorn', 'root', '', {
  host: '127.0.0.1',
  port: '3308',
  dialect: 'mysql'
});
const Model = Sequelize.Model;

class User extends Model {}
User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, { sequelize, modelName: 'user' });

sequelize.sync()
.then(() => User.create({
  id: uuidv4(),
  username: 'johndoe',
  password: '1234'
}))
.then(john => {
  console.log(john.toJSON());
});


/**
 *
 * body User 
 * returns User
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * userId UUID 
 * no response value expected for this operation
 **/
exports.deleteUserById = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * userId UUID 
 * returns User
 **/
exports.getUserById = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * body User 
 * returns User
 **/
exports.modifyUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

