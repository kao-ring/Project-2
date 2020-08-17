$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $("#funpostlist").on("change", function () {
    let id = this.value;
    $.get(`/api/posts/${id}`).then(function (data) {
      $("#fun-title").text(data.title);
      $("#fun-description").text(data.description);
    });
  });

  $("#seriouspostlist").on("change", function () {
    let id = this.value;
    $.get(`/api/posts/${id}`).then(function (data) {
      $("#serious-title").text(data.title);
      $("#serious-description").text(data.description);
    });
  });

  $("#btn").on("click", function () {
    let user = $(this).attr("name");
    $.get(`/api/users/${user}`).then(function (data) {
      for (var i = 0; i < data.Posts.length; i++) {
        $("#currentposts").append(`<li class="devouredB">
        <div class="text-left list" style="float: left;">
        ${data.Posts[i].id}. ${data.Posts[i].title} | ${data.Posts[i].description}
          
        </div>
        <div class="text-right list"><a href=# class="edit-post" data-id="${data.Posts[i].id}">edit</a> | <a href=# class="delete-post" data-id="${data.Posts[i].id}">delete</a></div>
      </li>`);
      }
      deletePost();
    });
  });

  function deletePost() {
    $(".delete-post").on("click", function (event) {
      var id = $(this).data("id");
      console.log("clicked id:" + id);

      // Send the DELETE request.
      $.ajax("/api/posts/" + id, {
        type: "DELETE",
      }).then(function () {
        console.log("deleted posts", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  }

  function editPost() {}
});
