'use strict';
const { faker } = require('@faker-js/faker');
module.exports = {
  up: async (qi) => {
    const parents = Array.from({ length: 10 }, () => {
      const fullName = faker.person.fullName();              
      const [first, last] = fullName.split(' ');
      const email = `${first.toLowerCase()}.${last.toLowerCase()}@schoolmail.com`;

      return {
        name:      fullName,
        email,
        phone:     faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await qi.bulkInsert('Parents', parents, {});
  },
  down: (qi) => qi.bulkDelete('Parents', null, {}),
};