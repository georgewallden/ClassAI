// backend/seeders/20250501-demo-classes.js
'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    // fixed class titles
    const classNames = ['Math 101', 'Science 201', 'History 301'];

    const classes = classNames.map((name) => ({
      name,
      teacher: faker.person.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Classes', classes, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Classes', null, {});
  },
};
