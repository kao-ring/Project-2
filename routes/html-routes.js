// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index", {
      styles: "homepage.css",
    });
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", {
      styles: "login.css",
    });
  });

  app.get("/signup", function (req, res) {
    res.render("signup", {
      styles: "signup.css",
    });
  });

  // Renders index.handlebars file
  app.get("/members", async function (req, res) {
    console.log(req.user);
    const viewData = {
      username: req.user.username,
      email: req.user.email,
      userid: req.user.id,
      funPosts: await db.Post.findAll({
        where: {
          //changes to BOOLEAN to match new MODEL
          isFun: true,
        },
      }),
      seriousPosts: await db.Post.findAll({
        where: {
          //UPDATED
          isFun: false,
        },
      }),
      styles: "memberspage.css",
    };
    console.log(viewData.funPosts);
    res.render("members", viewData);
  });

  app.get("/submit", function (req, res) {
    res.render("submit", {
      styles: "submit.css",
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("signup", {
      styles: "signup.css",
    });
  });
};
