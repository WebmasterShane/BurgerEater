
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("burgers", {
    burgerName: {
          type: DataTypes.STRING,
          allowNull: false,
        }
  });
  return Burger;
};
