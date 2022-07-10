const resumeItems = document.querySelectorAll(".resume-list-item");
resumeItems.forEach(function (item) {
  console.log("it works");
  item.addEventListener("mouseover", function () {
    this.setAttribute("title", "Hi! It's me");
  });
});
