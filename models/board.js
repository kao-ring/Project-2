module.exports = function (sequelize, DataTypes) {
  var Board = sequelize.define("Board", {
    title: DataTypes.STRING
  });
  Board.associate = function (models) {
    // Board.hasOne(models.Zipcode);
    Board.hasMany(models.Post);
  };

  return Board;
};
