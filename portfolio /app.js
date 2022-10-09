//              SIDEBAR BUTTON
const toggleBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.innerText === "Close") {
    sidebar.classList.add("closeActive");
    toggleBtn.classList.remove("closeBtn");
    toggleBtn.innerText = "Open";
    toggleBtn.classList.add("openBtn");
  } else {
    sidebar.classList.remove("closeActive");
    toggleBtn.classList.add("closeBtn");
    toggleBtn.innerText = "Close";
    toggleBtn.classList.remove("openBtn");
  }
});

//               SERVICE section
const list = document.querySelector(".service-list");
const itemsLi = document.querySelectorAll(".service-list-item");
const allDivsOfContent = document.querySelectorAll(".content-inner");
const contentList = document.querySelector(".content-list");
const counter = document.getElementById("counter");

itemsLi.forEach(function (li) {
  li.addEventListener("click", function () {
    const idContent = li.getAttribute("data-content");
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

//                     TITLE ANIMATION

const title = document.querySelector(".title-holder");
// const titles = document.querySelectorAll(".title-holder");
const titAbout = document.querySelector("#aboutH1");
const myResume = document.getElementById("myResume");

function revealTitle(text) {
  const strText = text.textContent;
  const splitTextArr = strText.split("");
  text.innerHTML = "";

  for (let i = 0; i < splitTextArr.length; i++) {
    text.innerHTML += "<span>" + splitTextArr[i] + "</span>";
  }
  const timer = setInterval(function () {
    onTick(text, splitTextArr.length);
  }, 50);
  //timerList[text] = timer;
  text["timer"] = timer;
  text["index"] = 0;
}

function onTick(text, length) {
  let i = text["index"];

  const span = text.querySelectorAll("span")[i];
  console.log(span);
  if (span === undefined) {
    return;
  }
  span.classList.add("fade");
  text["index"]++;
  if (text["index"] === length) {
    complete(text);
  }
}
function complete(text) {
  clearInterval(text["timer"]);
}

// titles.forEach((title) => {
//   // revealTitle(title);
//   getScrollPosition(title);
// });

//                  SCROLL POSITION

function getScrollPosition(title) {
  window.addEventListener("scroll", () => {
    const clientHeight = document.documentElement.clientHeight;
    console.log("clientHeight: " + clientHeight);
    const topElementToTopViewport = title.getBoundingClientRect().top;

    if (topElementToTopViewport < clientHeight * 0.8) {
      revealTitle(title);
    }
  });
}
getScrollPosition(titAbout);

/*                   RESUME                            */

const listItems = document.querySelectorAll(".resume-list-item");
const listResume = document.querySelector(".resume-list");
console.log(listResume);

listItems.forEach((listItem) => {
  listItem.addEventListener("mouseover", () => {
    appearTooltip(listItem, "0.4");
    listItem.style.opacity = "1";
  });
});

listItems.forEach((listItem) => {
  listItem.addEventListener("mouseout", () => {
    appearTooltip(listItem, "1");
  });
});

function appearTooltip(listItem, opacity) {
  listItem.lastElementChild.classList.toggle("show");
  listItems.forEach((item) => {
    item.style.opacity = opacity;
  });
}
