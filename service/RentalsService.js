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
 * body Rental 
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
 * body Rental 
 * returns Rental
 **/
exports.returnUnicorn = function(body) {
  return new Promise(function(resolve, reject) {
    Rental.update({
      unicorn: body.unicorn.id,
      user: body.user.id,
      status: 1,
      startTime: body.startTime,
      endTime: new Date()
    }, {
      where: {
        id: body.id
      }
    }).then((rental) => {
      resolve(rental)
    });
  });
}

