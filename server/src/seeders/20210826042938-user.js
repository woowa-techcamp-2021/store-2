'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const saltRound = +(process.env.HASH_SALT_ROUND || 1);
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash('guest', salt);

    await queryInterface.bulkInsert('Users', [
      {
        id: 'guest-id',
        userId: 'guest',
        password: hashedPassword,
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', { userId: 'guest' }, {});
  },
};
