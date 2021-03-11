
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("burgers", {
    burgerName: {
          type: DataTypes.STRING,
          validate: {
            len: [1]
          }
        },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return Burger;
};
