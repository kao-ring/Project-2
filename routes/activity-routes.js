var db = require("../models");

module.exports = function (app) {
  //write a get request
  //to access the latest post in fun stuff category
  //access the post by its id, get the last id
  app.get("/api/posts", function (req, res) {
    db.Post.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/users", function(req,res){
    db.Post.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  })
};


