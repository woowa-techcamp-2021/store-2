'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Addresses', [
      {
        name: '작은집',
        address: '서울특별시 송파구 신천동 올림픽로 295',
        receiver: '우아한 형제들',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 'guest-id',
      },
      {
        name: '큰집',
        address: '서울특별시 송파구 방이2동 위례성대로 2',
        receiver: '우아한 형제들',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 'guest-id',
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Addresses', { UserId: 'guest-id' }, {});
  },
};
