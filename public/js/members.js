$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
});
//to display the latest fun stuff post to the member page
$.get("/api/members").then(function (data) {
  $("#fun-title").append(
    `<div id="fun-title">${data.title}</div><div id="fun-description">${data.description}</div>`
  );
});
//display
