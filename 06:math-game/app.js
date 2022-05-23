let users = JSON.parse(window.localStorage.getItem("users"));
if (users === null) {
  users = {};
}
for (let user in users) {
  createDropdown(user, users[user]);
  window.localStorage.setItem("users", JSON.stringify(users));
}

function addNewUser() {
  const userName = document.getElementById("userName").value;
  createDropdown(userName, 0);
  document.getElementById("userName").value = " ";
  users[userName] = 0;
  window.localStorage.setItem("users", JSON.stringify(users));
}

function createDropdown(userName, scr) {
  const dropdown = createNewElement("div", "dropdown", userName);

  const mainBlock = document.querySelector(".main-block");
  mainBlock.append(dropdown);

  const dropbtn = createNewElement("button", "btn-dropdown", `${userName}Btn`);
  dropbtn.innerText = userName + " (";

  const score = createNewElement("span", "score", `${userName}Score`);
  score.innerText = scr;
  dropbtn.appendChild(score);

  const bracket = createNewElement("span", "bracket");
  bracket.innerText = ")";
  dropbtn.appendChild(bracket);

  dropbtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  dropdown.appendChild(dropbtn);

  const dropdownContent = createNewElement(
    "div",
    "dropdown-content",
    `${userName}DCont`
  );
  dropdown.append(dropdownContent);

  const play = createNewElement("a", "content", `${userName}Play`);
  play.innerText = "play";
  play.addEventListener("click", () => {
    checkMath(userName);
  });

  const del = createNewElement("a", "content", `${userName}Del`);
  del.innerText = "delete";
  del.addEventListener("click", () => {
    dropdown.remove();
    delete users[userName];
    localStorage.setItem("users", JSON.stringify(users));
  });

  const reset = createNewElement("a", "content", `${userName}Reset`);
  reset.innerText = "reset";
  reset.addEventListener("click", () => {
    score.innerText = "0";
    users[userName] = 0;
    localStorage.setItem("users", JSON.stringify(users));
  });

  dropdownContent.append(play, del, reset);
}

function createNewElement(tagName, className, id) {
  element = document.createElement(tagName);
  element.classList.add(className);
  element.setAttribute("id", id);
  return element;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSeconds() {
  return Math.round(new Date().getTime() / 1000);
}

function checkMath(name) {
  let secBefore = getSeconds();
  let score = 0;
  const operators = [
    {
      sign: "+",
      method: function (a, b) {
        return a + b;
      },
    },
    {
      sign: "-",
      method: function (a, b) {
        return a - b;
      },
    },
  ];

  for (let i = 1; i <= 5; i++) {
    const num1 = randomInt(10, 99);
    const num2 = randomInt(10, 99);
    const selectedOperator = randomInt(0, 1);
    const correctAnswer = operators[selectedOperator].method(num1, num2);
    userAnswer = prompt(
      `Please enter a correct answer in 2 seconds:\n ${num1} ${operators[selectedOperator]["sign"]} ${num2}`
    );

    // cancelled
    if (userAnswer === null) {
      return;
    }
    let secAfter = getSeconds();
    let timer = secAfter - secBefore;
    let userNum = parseInt(userAnswer);
    if (userNum === correctAnswer && timer <= 2) {
      score++;
    }
    secBefore = secAfter;
  } // for

  const elementSpan = document.getElementById(`${name}Score`);
  const oldScoreStr = elementSpan.innerText;
  let oldScoreInt = parseInt(oldScoreStr);
  let total = oldScoreInt + score;
  elementSpan.innerText = total;
  users[name] = total;
  localStorage.setItem("users", JSON.stringify(users));
}
