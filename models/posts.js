//ACTIVITY TABLE

//description -- text, max len 200

//GET THE ACTIVITY LOCATION through user zip code

module.exports = function (sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    //ADD OUR TITLE COLUMN and DEFINE it
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 25],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //CHECK IF THIS IS CORRECT===========>>>>>>
        is: {
          args: [["fun stuff", "serious stuff"]],
          msg: "Must be fun stuff or serious stuff",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5, 1000],
      },
    },
  });
  Posts.associate = function (models) {
    Posts.hasOne(models.User);
    Posts.hasOne(models.Board);
  };

  return Posts;
};
