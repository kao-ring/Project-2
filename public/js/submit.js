console.log(location.search);

if (location.search.split("=")[1] === "true") {
  $("#fun").attr("checked", "checked");
} else {
  $("#serious").attr("checked", "checked");
}

$(document).ready(function () {
  var form = $("form#form1");
  var title = $("#title");
  var isFun = false;
  var description = $("#description");

  form.on("submit", function (event) {
    event.preventDefault();

    if ($("input:checked").val() === "true") {
      isFun = true;
    } else {
      isFun = false;
    }

    var newPost = {
      title: title.val().trim(),
      isFun: isFun,
      description: description.val(),
    };

    $.post("/api/posts", {
      title: newPost.title,
      isFun: newPost.isFun,
      description: newPost.description,
    }).then(function (data) {
      console.log(data);
      alert("Thank you for posting " + data.title);
      window.location.replace("/members");
    });
  });
});
