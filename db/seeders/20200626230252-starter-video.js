'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Videos', [
        {
          title: "Boardwalk Empire",
          description: "Playing hitman Red Levine",
          playCount: 0,
          videoUrl: 'https://pastlives.s3.amazonaws.com/boardwalk.mov',
          thumbUrl: 'https://pastlives.s3.amazonaws.com/boardwalk.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Law & Order: SVU",
          description: "Playing Justine",
          playCount: 0,
          videoUrl: 'https://pastlives.s3.amazonaws.com/svu.mp4',
          thumbUrl: 'https://pastlives.s3.amazonaws.com/svu.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "A Cool Dark Place",
          description: "Playing French waiter, Marcel",
          playCount: 0,
          videoUrl: 'https://pastlives.s3.amazonaws.com/cooldark.mov',
          thumbUrl: 'https://pastlives.s3.amazonaws.com/cooldark.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

     */

    return queryInterface.bulkDelete('Videos', null, {});
   
  }
};
