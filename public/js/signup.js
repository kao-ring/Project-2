$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name");
  var emailInput = $("input#email");
  var zipCodeInput = $("input#zipcode");
  var passwordInput = $("input#password");

  //display the zip codes to the signup page
  var state = "NY";
  var zipArr = [];
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary/state/" +
      state,
    method: "GET",
    headers: {
      "x-rapidapi-host": "vanitysoft-boundaries-io-v1.p.rapidapi.com",
      "x-rapidapi-key": "33220dbdedmsh5499ccf0fb9b28fp11bb85jsn968ac695016c",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response.features[0].properties.zipCodes);
    var arr = response.features[0].properties.zipCodes;
    for (let i = 0; i < arr.length; i++) {
      let zipcode = arr[i];
      zipArr.push(zipcode);
    }

    $(function () {
      $("#zipcode").autocomplete({
        source: zipArr,
      });
    });
  });

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      zipcode: zipCodeInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        zipcode: userData.zipcode,
      })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
    // .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});