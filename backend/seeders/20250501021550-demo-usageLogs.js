'use strict';

module.exports = {
  up: async (queryInterface) => {
    // dynamically import the ESM faker package
    const { faker } = await import('@faker-js/faker');

    const logs = [];
    for (let sid = 1; sid <= 30; sid++) {
      for (let i = 0; i < 5; i++) {
        logs.push({
          app:       faker.helpers.arrayElement(['AppA','AppB','AppC']),
          timestamp: faker.date.recent(30),
          studentId: sid,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('UsageLogs', logs);
  },

  down: (queryInterface) => queryInterface.bulkDelete('UsageLogs', null, {})
};