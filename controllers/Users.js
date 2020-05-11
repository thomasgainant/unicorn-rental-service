'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.createUser = function createUser (req, res, next, userData) {
  Users.createUser(userData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserById = function deleteUserById (req, res, next, userId) {
  Users.deleteUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserById = function getUserById (req, res, next, userId) {
  Users.getUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modifyUser = function modifyUser (req, res, next, userData) {
  Users.modifyUser(userData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
