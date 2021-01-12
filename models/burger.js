
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("burgerName", {
    burgerName: {
          type: DataTypes.STRING,
          allowNull: false,
        }
  });
  return Burger;
};
