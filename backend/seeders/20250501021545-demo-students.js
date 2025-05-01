'use strict';
const { faker } = require('@faker-js/faker');   // ← ADD THIS

module.exports = {
  up: async (queryInterface) => {
    const parentsCount = 10;
    const classesCount = 3;

    const students = Array.from({ length: 30 }, () => {
      const fullName = faker.person.fullName();           // e.g. “Garrett Davis”
      const [ first, last ] = fullName.split(' ');
      const email = `${first.toLowerCase()}.${last.toLowerCase()}@schoolmail.com`;

      return {
        name:      fullName,
        email,                                           // “garrett.davis@schoolmail.com”
        grade:     faker.number.int({ min: 1, max: 12 }).toString(),
        parentId:  faker.number.int({ min: 1, max: parentsCount }),
        classId:   faker.number.int({ min: 1, max: classesCount }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Students', students, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Students', null, {});
  },
};