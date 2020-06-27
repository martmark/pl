'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dislike: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["videoId", "userId"]
        }
      ]
    }
  );
  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId"
    });
    Like.belongsTo(models.Video, {
      as: "video",
      foreignKey: "videoId",
    });
  };
  return Like;
};