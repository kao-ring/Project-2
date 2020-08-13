$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
//links with memebers html

//board with members posts

//handled in API routes

//fun stuff==============================
//updated info in div POST
//submission

//serious stuff==========================
//updated info in div POST
//submission
