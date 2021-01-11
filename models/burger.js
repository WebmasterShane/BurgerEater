
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("burger", {
    burgerName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1, 140]
          }
    }
  });
  return Burger;
};
