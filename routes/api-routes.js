// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    console.log(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  // app.post("/api/signup", async function (req, res) {
  //   try {
  //     let zipcodeId;

  //     const foundZipcode = await db.Zipcode.findOne({
  //       where: { zipcode: req.body.zipcode },
  //     });

  //     if (foundZipcode) {
  //       zipcodeId = foundZipcode.id;
  //     } else {
  //       const newZipcode = await db.Zipcode.create({
  //         zipcode: req.body.zipcode,
  //       });
  //       zipcodeId = newZipcode.id;
  //     }

  //     await db.User.create({
  //       username: req.body.username,
  //       email: req.body.email,
  //       password: req.body.password,
  //       ZipcodeId: zipcodeId,
  //     });
  //   } catch (error) {
  //     var errors = error.errors.map((error) => error.message);
  //     console.log(errors);
  //     return res.json(errors);
  //   }
  //   res.redirect(307, "/api/login");
  app.post("/api/signup", async function (req, res) {
    db.Zipcode.findOne({ where: { zipcode: req.body.zipcode } }).then(function (
      foundZipcode
    ) {
      if (!foundZipcode) {
        console.log("NOT FOUND", req.body.zipcode);
        db.Zipcode.create({ zipcode: req.body.zipcode })
          .then(function (newZipcode) {
            db.User.create({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              ZipcodeId: newZipcode.id,
            })
              .then(function (data) {
                return res.redirect(307, "/api/login");
              })
              .catch(function (err) {
                //make sure email isnt in use========= using map or .filter (go through array)
                var errors = err.errors.map((error) => error.message);
                console.log(errors);
                res.json(errors);
                //return to front end (output)
              });
          })
          .catch(function (err) {
            //make sure email isnt in use========= using map or .filter (go through array)
            var errors = err.errors.map((error) => error.message);
            console.log(errors);
            res.json(errors);
            //return to front end (output)
          });
      } else {
        console.log(foundZipcode);

        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          ZipcodeId: foundZipcode.id,
        })
          .then(function (data) {
            res.redirect(307, "/api/login");
          })
          .catch(function (err) {
            //make sure email isnt in use========= using map or .filter (go through array)
            var errors = err.errors.map((error) => error.message);
            console.log(errors);
            res.json(errors);
            //return to front end (output)
          });
      }
    });
  });
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // get request for username

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  //get all zip codes from database
  app.get("/api/zip", function (req, res) {
    db.Zipcode.findAll({}).then(function (dbZipcode) {
      res.json(dbZipcode);
    });
  });

  app.post("/api/zip", function (req, res) {
    db.Zipcode.create(req.body)
      .then(function (response) {
        res.json(response);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  //GET ROUTE FOR RETRIEVING A SINGLE POST BY ITS ID
  app.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPost) {
      res.json(dbPost);
      console.log(dbPost);
    });
  });

  //Get all of the users from the database
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [db.Post],
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Get a specific user's posts from the database
  app.get("/api/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Post],
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // GET route for getting all of the posts
  app.get("/api/posts", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findAll({
      where: query,
      include: [db.User],
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.User],
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/posts", function (req, res) {
    db.Post.create({
      title: req.body.title,
      isFun: req.body.isFun,
      description: req.body.description,
      UserId: req.user.id,
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Add sequelize code to find a single post where the id is equal to req.params.id,
  // return the result to the user with res.json
};
