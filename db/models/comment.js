'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    }, {}
  );
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'userId'
    });
    Comment.belongsTo(models.Video, {
      as: "video",
      foreignKey: "videoId",
    });
  };
  return Comment;
};