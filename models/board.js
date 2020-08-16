module.exports = function (sequelize, DataTypes) {
  var Board = sequelize.define("Board", {
    title: DataTypes.STRING
  });
  Board.associate = function (models) {
    // Board.belongsTo(models.Zipcode, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
    Board.hasMany(models.Post);
  };

  return Board;
};
