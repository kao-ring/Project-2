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

  return Zipcode;
};
