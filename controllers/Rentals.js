'use strict';

var utils = require('../utils/writer.js');
var Rentals = require('../service/RentalsService');

module.exports.rentUnicorn = function rentUnicorn (req, res, next, rentalData) {
  Rentals.rentUnicorn(rentalData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.returnUnicorn = function returnUnicorn (req, res, next, rentalData) {
  Rentals.returnUnicorn(rentalData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
