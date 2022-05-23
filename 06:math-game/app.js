let users = JSON.parse(window.localStorage.getItem("users"));
console.log(users);
if (users === null) {
  users = {};
}
for (let user in users) {
  createDropdown(user, users[user]);
  window.localStorage.setItem("users", JSON.stringify(users));
}
console.log(users);
// const users = {};
// const savedUsers = JSON.parse(window.localStorage.getItem("users"));
// console.log(savedUsers);

// for (let savedUser in savedUsers) {
//   createDropdown(savedUser, savedUsers[savedUser]);
//   window.localStorage.setItem("users", JSON.stringify(savedUsers));
// }

function addNewUser() {
  const userName = document.getElementById("userName").value;
  createDropdown(userName, 0);
  document.getElementById("userName").value = " ";
  users[userName] = 0;
  window.localStorage.setItem("users", JSON.stringify(users));
}

function createDropdown(userName, scr) {
  const dropdown = createNewElement("div", "dropdown");
  dropdown.setAttribute("id", userName);

  const mainBlock = document.querySelector(".main-block");
  mainBlock.append(dropdown);

  const dropbtn = createNewElement("button", "btn-dropdown");
  dropbtn.setAttribute("id", `${userName}Btn`);
  dropbtn.innerText = userName + " (";

  const score = createNewElement("span", "score");
  score.innerText = scr;
  score.setAttribute("id", `${userName}Score`);
  dropbtn.appendChild(score);

  const bracket = createNewElement("span", "bracket");
  bracket.innerText = ")";
  dropbtn.appendChild(bracket);

  dropbtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });

  dropdown.appendChild(dropbtn);

  const dropdownContent = createNewElement("div", "dropdown-content");
  dropdownContent.setAttribute("id", `${userName}DCont`);
  dropdown.append(dropdownContent);

  const play = createNewElement("p", "content");
  play.setAttribute("id", `${userName}Play`);
  play.innerText = "play";
  play.addEventListener("click", () => {
    checkMath(userName);
  });

  const del = createNewElement("p", "content");
  del.setAttribute("id", `${userName}Del`);
  del.innerText = "delete";
  del.addEventListener("click", () => {
    dropdown.remove();
    delete users[userName];
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users); // prints { "objtwo": two}
  });

  const reset = createNewElement("p", "content");
  reset.setAttribute("id", `${userName}Reset`);
  reset.innerText = "reset";
  reset.addEventListener("click", () => {
    score.innerText = "0";
    users[userName] = 0;
    localStorage.setItem("users", JSON.stringify(users));
  });

  dropdownContent.append(play, del, reset);
}

function createNewElement(tagName, className) {
  element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkMath(name) {
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

  for (let i = 1; i <= 1; i++) {
    const num1 = randomInt(1, 10);
    const num2 = randomInt(1, 10);
    const selectedOperator = randomInt(0, 1);

    const correctAnswer = operators[selectedOperator].method(num1, num2);
    userAnswer = prompt(
      `Please enter a correct answer in 2 seconds:\n ${num1} ${operators[selectedOperator]["sign"]} ${num2}`
    );

    // cancelled
    if (userAnswer === null) {
      return;
    }

    let userNum = parseInt(userAnswer);

    if (userNum === correctAnswer) {
      score++;
    }
  } // for

  const elementSpan = document.getElementById(`${name}Score`);
  const oldScoreStr = elementSpan.innerText;
  let oldScoreInt = parseInt(oldScoreStr);
  let total = oldScoreInt + score;
  elementSpan.innerText = total;
  users[name] = total;
  localStorage.setItem("users", JSON.stringify(users));
}
