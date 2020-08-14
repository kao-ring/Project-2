'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     
     await queryInterface.bulkInsert('Users', [{
       username: 'JohnDoe',
       email: 'happy@gmail.com',
       password: 'super',
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
