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
    isFun: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Post.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Post;
};
