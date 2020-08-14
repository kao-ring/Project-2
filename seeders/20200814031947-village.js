'use strict';
var db = require("../models");
var bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    //  db.User.create({
    //   username: 'JohnDoe',
    //   email: 'happy@gmail.com',
    //   password: 'super',
    //  })
     await queryInterface.bulkInsert('Users', [{
       username: 'JohnDoe',
       email: 'happy@gmail.com',
       password: bcrypt.hashSync(
        "super",
        bcrypt.genSaltSync(10),
        null
      )
      ,
       createdAt: new Date(),
       updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
