'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {}
  );
  User.associate = function(models) {
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'userId'
    });
    User.hasMany(models.Like, {
      as: "likes",
      foreignKey: "userId",
    });
  };
  return User;
};