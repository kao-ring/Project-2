// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // app.get("/members", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // Renders index.handlebars file
  app.get("/members", async function(req, res) {
    console.log(req.user);
    const viewData = {
      username: req.user.username,
      email: req.user.email,
      funPosts: await db.Post.findAll({
        where:{
          category: "fun stuff"
        }
      }),
      seriousPosts: await db.Post.findAll({
        where:{
          category: "serious stuff"
        }
      }),
    }
    console.log(req.Post.description)
    console.log(viewData);
    res.render("index", viewData);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};
