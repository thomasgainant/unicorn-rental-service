'use strict';

var utils = require('../utils/writer.js');
var Misc = require('../service/MiscService');

module.exports.getHealth = function getHealth (req, res, next) {
  Misc.getHealth()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
