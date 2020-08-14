$(document).ready(function () {
  var form = $("form#form1");
  var title = $("#title");
  var category = $("input:checked").val();
  var description = $("#description");

  form.on("submit", function (event) {
    console.log("submit!");
    event.preventDefault();

    var newPost = {
      title: title.val().trim(),
      category: category,
      description: description.val(),
    };

    $.post("/api/posts", {
      title: newPost.title,
      category: newPost.category,
      description: newPost.description,
    }).then(function (data) {
      //   window.location.replace("/members");
    });
  });
});
