$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  //on search button click get the value

  // $("#fun-search").change(function () {
  //   console.log("hi");
  // });

  $('#funpostlist').on('change', function() {
    let id = this.value;
    $.get(`/api/posts/${id}`).then(function (data) {
        $("#fun-title").text(data.title);
        $("#fun-description").text(data.description);
    });
  });

  $('#seriouspostlist').on('change', function() {
    let id = this.value;
    $.get(`/api/posts/${id}`).then(function (data) {
        $("#serious-title").text(data.title);
        $("#serious-description").text(data.description);
    });
  });

//   $("#fun-search").on("click", function () {
//     event.preventDefault();
//     // grab id
//     console.log($(this));
//     var id;
//     $.get(`/api/posts/${id}`).then(function (data) {
//       // $(".member-name").text(data.email);
//     });
//     // get request with id
    
//   });
// });

//to display the latest fun stuff post to the member page
// $.get("/api/members").then(function (data) {
//   $("#fun-title").append(
//     `<div id="fun-title">${data.title}</div><div id="fun-description">${data.description}</div>`
//   );
// });
// //display the description of the clicked funStuff title
// $.get("/api/members").then(function (data) {
//   $("#fun-description").text(
//     `<div id="fun-description">${this.data.description}</div>`
//   );
});
