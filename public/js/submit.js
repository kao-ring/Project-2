console.log(location.search);

var updating = false;

if (location.search.split("=")[1] === "true") {
  $("#fun").attr("checked", "checked");
} else if (location.search.split("=")[1] === "false") {
  $("#serious").attr("checked", "checked");
} else {
  var postId = location.search.split("=")[1];
  getPostData(postId);
}

function getPostData(id) {
  $.get("/api/posts/" + id, function (data) {
    if (data) {
      $("#title").val(data.title);
      $("#description").val(data.description);

      if (data.isFun === true) {
        $("#fun").attr("checked", "checked");
      } else if (data.isFun === false) {
        $("#serious").attr("checked", "checked");
      }
      updating = true;
    }
  });
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

    if (updating) {
      console.log("updateだよー。");
      newPost.id = postId;
      updatePost(newPost);
    } else {
      console.log("ニューポストだよー。");
      submitPost(newPost);
    }

    function submitPost() {
      $.post("/api/posts", {
        title: newPost.title,
        isFun: newPost.isFun,
        description: newPost.description,
      }).then(function (data) {
        console.log(data);
        alert("Thank you for posting " + data.title);
        window.location.replace("/members");
      });
    }

    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post,
      }).then(function () {
        window.location.href = "/members";
      });
    }
  });
});
