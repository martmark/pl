'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      playCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      thumbUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Video.associate = function(models) {
    Video.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "videoId",
    });
    Video.hasMany(models.Like, {
      as: "likes",
      foreignKey: "videoId",
    });
  };
  return Video;
};