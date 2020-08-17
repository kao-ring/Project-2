console.log(location.search);
var updating = false;

//check URL after ?, then make radio check bottun or get id for edit function
if (location.search.split("=")[1] === "true") {
  $("#fun").attr("checked", "checked");
} else if (location.search.split("=")[1] === "false") {
  $("#serious").attr("checked", "checked");
} else {
  var postId = location.search.split("=")[1];
  getPostData(postId);
}

//sending get request with id on URL after?mark then put back all information to post form
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
    //checking this form is a new post or editing post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
    //post as a new post
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
    // sending form as an edited data
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
