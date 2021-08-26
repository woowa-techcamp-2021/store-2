'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      {
        score: 5,
        title: '복많은 엽서!!',
        contents: '정말 복이 들어올 것 같네요 ~~',
        imgUrl: '',
        ItemId: 23,
        UserId: 'guest-id',
        createdAt: new Date('2021-08-25'),
        updatedAt: new Date('2021-08-25'),
      },
      {
        score: 1,
        title: '위트있게 찢어지네요',
        contents: '사서 붙이려는데 바로 찢어졌습니다.. 뭐 이런 경우가 다 있나요? 환불해주세요.',
        imgUrl: '',
        ItemId: 123,
        UserId: 'guest-id',
        createdAt: new Date('2021-06-01'),
        updatedAt: new Date('2021-06-01'),
      },
      {
        score: 5,
        title: '좋네요',
        contents: '여기 엽서가 진짜 좋아요',
        imgUrl: '',
        ItemId: 24,
        UserId: 'guest-id',
        createdAt: new Date('2021-06-13'),
        updatedAt: new Date('2021-06-13'),
      },
      {
        score: 3,
        title: '그냥 호기심에 사봤어요',
        contents: '그냥 호기심에 사봤는데 쓸데없긴 하네요.. 근데 또 귀엽기도 하고..',
        imgUrl: '',
        ItemId: 74,
        UserId: 'guest-id',
        createdAt: new Date('2021-06-30'),
        updatedAt: new Date('2021-06-30'),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Reviews', { UserId: 'guest-id' }, {});
  },
};
