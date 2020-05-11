'use strict';

const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('unicorn', 'root', '', {
  host: '127.0.0.1',
  port: '3308',
  dialect: 'mysql'
});
const Model = Sequelize.Model;

class Rental extends Model {}
Rental.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  unicorn: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  user: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  status: Sequelize.INTEGER,
  startTime: Sequelize.DATE,
  endTime: Sequelize.DATE
}, { sequelize, modelName: 'rental' });

sequelize.sync().then(() => {});

/**
 *
 * rentalData Rental 
 * returns Rental
 **/
exports.rentUnicorn = function(rentalData) {
  return new Promise(function(resolve, reject) {
    Rental.create({
      id: uuidv4(),
      unicorn: uuidv4(),
      user: uuidv4(),
      status: 0,
      startTime: new Date(),
      endTime: null
    }).then(rental => {
      resolve(rental);
    });
  });
}


/**
 *
 * rentalData Rental 
 * returns Rental
 **/
exports.returnUnicorn = function(rentalData) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "startTime" : "2000-01-23T04:56:07.000+00:00",
  "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
  "endTime" : "2000-01-23T04:56:07.000+00:00",
  "unicorn" : {
    "restingTime" : 0.8008281904610115,
    "name" : "name",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
  },
  "user" : {
    "password" : "password",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "username" : "username"
  },
  "status" : "rented"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

