$(document).ready(function () {

  // CHANGED VAR to LET
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us to the members page
  function loginUser(userData) {
    $.post("/api/login", {

        email: userData.email,
        password: userData.password,
      })
      .then(function (user) {
        // console.log(user);

        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});