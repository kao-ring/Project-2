// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
<<<<<<< HEAD
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
=======

    //ADD USERNAME COLUMN
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 15],
      },
    },
    //ADD ZIP CODE COLUMN
    zipcode: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
        isNumeric: true,
        len: [5],
      },
>>>>>>> b30ebbe5556d7abceb43edaace242a8efcda4688
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password / incrypted password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
