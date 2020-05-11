'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('unicorn', 'root', '', {
  host: '127.0.0.1',
  port: '3308',
  dialect: 'mysql'
});
const Model = Sequelize.Model;

class Unicorn extends Model {}
Unicorn.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: Sequelize.STRING,
  restingTime: Sequelize.FLOAT //In seconds
}, { sequelize, modelName: 'unicorn' });

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

/**
 *
 * no response value expected for this operation
 **/
exports.getHealth = function() {
  return new Promise(function(resolve, reject) {
    uniqueRentalTest().then((res) => {
      if(res == 0){
        resolve({status: "Service healthy"});
      }
      else{
        resolve({status: "Service unhealthy"});
      }
    });
  });
}

function uniqueRentalTest(){
  return new Promise(function(resolve, reject) {
    sequelize.sync().then(() => {
      Unicorn.findAll().then((unicorns) => {
        for(let index in unicorns){
          let unicorn = unicorns[index];
          Rental.findAll({ where: { unicorn: unicorn.id, status: 1 } }).then((rentalsForThisUnicorn) => {
            if(rentalsForThisUnicorn.length > 1){
              resolve(rentalsForThisUnicorn.length);
            }
          });
          if(index == unicorns.length - 1){
            resolve(0);
          }
        }
      });
    });
  });
}

exports.mainTest = uniqueRentalTest;