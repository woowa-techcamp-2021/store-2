module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        address: '서울특별시 송파구 신천동 올림픽로 295',
        receiver: '우아한 형제들',
        quantity: 4,
        status: 0,
        ItemId: 23,
        UserId: 'guest-id',
        createdAt: new Date('2021-08-23'),
        updatedAt: new Date('2021-08-23'),
      },
      {
        address: '서울특별시 송파구 신천동 올림픽로 295',
        receiver: '우아한 형제들',
        quantity: 2,
        status: 0,
        ItemId: 123,
        UserId: 'guest-id',
        createdAt: new Date('2021-05-30'),
        updatedAt: new Date('2021-05-30'),
      },
      {
        address: '서울특별시 송파구 신천동 올림픽로 295',
        receiver: '우아한 형제들',
        quantity: 2,
        status: 0,
        ItemId: 24,
        UserId: 'guest-id',
        createdAt: new Date('2021-06-12'),
        updatedAt: new Date('2021-06-12'),
      },
      {
        address: '서울특별시 송파구 방이2동 위례성대로 2',
        receiver: '우아한 형제들',
        quantity: 2,
        status: 1,
        ItemId: 74,
        UserId: 'guest-id',
        createdAt: new Date('2021-06-23'),
        updatedAt: new Date('2021-06-23'),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Orders', { UserId: 'guest-id' }, {});
  },
};
