//ACTIVITY TABLE

//description -- text, max len 200

//GET THE ACTIVITY LOCATION through user zip code

module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    //ADD OUR TITLE COLUMN and DEFINE it
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   //CHECK IF THIS IS CORRECT===========>>>>>>
      //   is: {
      //     args: ["fun stuff", "serious stuff"],
      //     msg: "Must be fun stuff or serious stuff",
      //   },
      // },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5, 1000],
      },
    },
  });
  Post.associate = function (models) {
    // Post.hasOne(models.User);
    // Post.hasOne(models.Board);
  };

  return Post;
};
