const list = document.querySelector(".service-list");
const itemsLi = document.querySelectorAll(".service-list-item");
const allDivsOfContent = document.querySelectorAll(".content-inner");
const contentList = document.querySelector(".content-list");
const counter = document.getElementById("counter");

itemsLi.forEach(function (li) {
  li.addEventListener("click", function () {
    idContent = li.getAttribute("data-content");
    const contentDiv = document.getElementById(idContent);
    contentDiv.style.display = "block";

    list.style.flexDirection = "column";
    itemsLi.forEach((item) => {
      item.style.width = "100%";
      item.style.opacity = "0.4";
    });
    li.style.opacity = "1";
    list.style.width = "50%";
    contentList.style.width = "50%";
    list.querySelector(".counter").style.backgroundColor = "#000";
    this.querySelector(".counter").style.backgroundColor = "red";

    const oldIdContent = list.firstElementChild.getAttribute("data-content");
    const oldContentDiv = document.getElementById(oldIdContent);
    if (list.firstElementChild !== li) {
      oldContentDiv.style.display = "none";
    }

    list.insertBefore(li, list.firstChild);
  });
});
