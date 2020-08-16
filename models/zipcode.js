module.exports = function (sequelize, DataTypes) {
  var Zipcode = sequelize.define("Zipcode", {
    //ADD ZIP CODE COLUMN
    zipcode: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        len: [5],
      },
      allowNull: false,
    },
  });
<<<<<<< HEAD
  Zipcode.associate = function (models) {
    Zipcode.hasMany(models.User);
    Zipcode.hasOne(models.Board);
    Zipcode.hasMany(models.Post);
  };
=======

>>>>>>> master
  return Zipcode;
};
