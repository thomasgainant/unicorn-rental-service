'use strict';

/* ORM init */

const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('unicorn', 'root', 'root', {
  host: 'db-unicorn',
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

sequelize.sync().then(() => {
  Unicorn.create({
    id: uuidv4(),
    name: 'Pinky Pie',
    restingTime: 15*60
  })
  .then(unicorn => {
    console.log(`Created unicorn ${unicorn.toJSON()}`);
  });

  Unicorn.create({
    id: uuidv4(),
    name: 'Rainbow Dash',
    restingTime: 15*60
  })
  .then(unicorn => {
    console.log(`Created unicorn ${unicorn.toJSON()}`);
  });

  Unicorn.create({
    id: uuidv4(),
    name: 'Fluttershy',
    restingTime: 15*60
  })
  .then(unicorn => {
    console.log(`Created unicorn ${unicorn.toJSON()}`);
  });

  Unicorn.create({
    id: uuidv4(),
    name: 'Twilight Sparkle',
    restingTime: 30*60
  })
  .then(unicorn => {
    console.log(`Created unicorn ${unicorn.toJSON()}`);
  });
});

/**
 *
 * body Rental 
 * returns Rental
 **/
exports.rentUnicorn = function(body) {
  return new Promise(function(resolve, reject) {
    Unicorn.findOne({ where: { id: body.unicorn.id } }).then((resUnicorn) => {
      if(resUnicorn == null){
        //Unicorn not found
        reject({payload: "Unicorn not found", code: 404});
      }
      else{
        Rental.findOne({ where: { unicorn: body.unicorn.id, status: 0 } }).then((resRental) => {
          //If no current Rental for this Unicorn
          if(resRental == null){
            Rental.findAll({ where: { unicorn: body.unicorn.id, status: 1 } }).then((rentalsForThisUnicorn) => {
              let rested = false;

              let lastRental = null;
              let lastRentalReturnTime = null;
              for(let rental of rentalsForThisUnicorn){
                let rentalReturnTime = new Date(rental.endTime);

                if(lastRental == null){
                  lastRental = rental;
                  lastRentalReturnTime = rentalReturnTime;
                }
                else if(rentalReturnTime > lastRentalReturnTime){
                    lastRental = rental;
                    lastRentalReturnTime = rentalReturnTime;
                }
              }

              if(lastRental == null){
                rested = true;
              }
              else{
                var now = new Date();
                var diff = now.getTime() - lastRentalReturnTime.getTime();

                var secondsBetween = diff / 1000;
                secondsBetween = Math.abs(secondsBetween);

                if(secondsBetween > resUnicorn.restingTime){
                  rested = true;
                }
              }

              //If unicorn is rested
              if(rested){
                Rental.create({
                  id: uuidv4(),
                  unicorn: resUnicorn.id,
                  user: uuidv4(),
                  status: 0,
                  startTime: new Date(),
                  endTime: null
                }).then(rental => {
                  resolve(rental);
                });
              }
              else{
                reject({payload: "This Unicorn is not yet rested", code: 400});
              }
            });
          }
          else{
            //This unicorn is rented
            reject({payload: "Unicorn already rented", code: 404});
          }
        });
      }
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
    Unicorn.findOne({ where: { id: body.unicorn.id } }).then((res) => {
      if(res == null){
        //Unicorn not found
        reject({payload: "Unicorn not found", code: 404});
      }
      else{
        Rental.findOne({ where: { unicorn: body.unicorn.id, status: 0 } }).then((resRental) => {
          //If no current Rental for this Unicorn
          if(resRental == null){
            //No Rental not found
            reject({payload: "Rental not found", code: 404});
          }
          else if(resRental.id == body.id){
            Rental.update({
              unicorn: resRental.unicorn,
              user: resRental.user,
              status: 1,
              startTime: resRental.startTime,
              endTime: new Date()
            }, {
              where: {
                id: body.id
              }
            }).then((rental) => {
              resolve(rental)
            });
          }
          else{
            //Rental with this id not found
            reject({payload: "Rental not found", code: 404});
          }
        });
      }
    });
  });
}

