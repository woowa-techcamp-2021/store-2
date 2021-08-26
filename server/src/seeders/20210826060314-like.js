'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      { UserId: 'guest-id', ItemId: 7, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 10, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 21, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 34, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 40, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 72, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 92, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 111, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 113, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 116, createdAt: new Date(), updatedAt: new Date() },
      { UserId: 'guest-id', ItemId: 141, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Likes', { UserId: 'guest-id' }, {});
  },
};
