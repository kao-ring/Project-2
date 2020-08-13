module.exports = function (sequelize, DataTypes) {
  var Zipcode = sequelize.define("Zipcode", {
    //ADD ZIP CODE COLUMN
    zipcode: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        isNumeric: true,
        len: [5],
      },
    },
  });
  Zipcode.associate = function (models) {
    Zipcode.hasMany(models.User);
    Zipcode.hasOne(models.Board);
  };
  return Zipcode;
};
