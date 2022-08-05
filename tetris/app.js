/*
let currentX = 0;
let currentY = 0;
let timerInterval = null;
let rect = null;
let paused = false;

function makeRect() {
  rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttributeNS(null, "x", "160");
  rect.setAttributeNS(null, "y", "1");
  rect.setAttributeNS(null, "width", "38");
  rect.setAttributeNS(null, "height", "38");

  const array = ["brown", "aqua", "teal", "olive", "green", "orange", "red"];
  const color = Math.floor(Math.random() * array.length);
  const randomColor = array[color];

  rect.setAttributeNS(null, "fill", randomColor);
  document.querySelector("svg").appendChild(rect);
}

function makeLine(x1, x2, y1, y2) {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", x1);
  newLine.setAttribute("y1", y1);
  newLine.setAttribute("x2", x2);
  newLine.setAttribute("y2", y2);
  newLine.setAttribute("stroke", "grey");
  const svg = document.querySelector("svg");
  svg.append(newLine);
}

function makeLines() {
  let x = 40;
  for (let i = 1; i <= 9; i++) {
    makeLine(x, x, 2, 898);
    x += 40;
  }

  let y = 40;
  for (let i = 1; i <= 19; i++) {
    makeLine(2, 400, y, y);
    y += 40;
  }
}
// makeLines();

function moveShape() {
  let transformAttr = "translate(" + currentX + "," + currentY + ")";
  rect.setAttribute("transform", transformAttr);
}

function play() {
  makeRect();
  startInterval();
}

function pause() {
  paused = !paused;
}

function startInterval() {
  if (timerInterval === null) {
    timerInterval = setInterval(goDown, 1000);
  }
}

function goDown() {
  if (paused) return;

  if (currentY <= 720) {
    currentY += 40;
    moveShape();
    console.log("down:" + currentY);
  } else if (currentY === 760) {
    currentX = 0;
    currentY = 0;
    makeRect();
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      //left
      if (currentX >= -120) {
        currentX -= 40;
        moveShape();
        console.log("left:" + currentX);
      }
      break;
    case "ArrowRight":
      //right
      if (currentX <= 160) {
        currentX += 40;
        moveShape();
        console.log("right:" + currentX);
      }
      break;
    case "ArrowDown":
      //down
      goDown();
      break;
  }
});
*/

function play() {}
function myFunction() {}

const mainArrayDiv = [];

const createDiv = () => {
  const newDiv = document.createElement("div");
  newDiv.style.width = "39px";
  newDiv.style.height = "39px";
  newDiv.style.borderBottom = "1px solid grey";
  newDiv.style.borderRight = "1px solid grey";
  const playArea = document.getElementById("playArea");
  playArea.append(newDiv);

  return newDiv;
};

function createDivArray() {
  for (let i = 0; i < 20; i++) {
    const array = [];
    for (let j = 0; j < 10; j++) {
      const div = createDiv();
      array[j] = div;
    }
    mainArrayDiv.push(array);
  }
}
createDivArray();

let randomNumFig = Math.floor(Math.random() * 7) + 1;
let randomNumRow = Math.floor(Math.random() * 19);
let randomNumCol = Math.floor(Math.random() * 7);

const colorArray = ["B", "G", "O", "Y", "W", "P"];
randomColor = Math.floor(Math.random() * colorArray.length);

const figures = {
  1: [
    ["*", "*"],
    ["*", "*"],
  ],
  2: [
    ["", "*", ""],
    ["*", "*", "*"],
  ],
  3: [
    ["*", "", ""],
    ["*", "*", "*"],
  ],
  4: [
    ["*", "*", ""],
    ["", "*", "*"],
  ],
  5: [
    ["", "*", "*"],
    ["*", "*", ""],
  ],
  6: [
    ["", "", "*"],
    ["*", "*", "*"],
  ],
  7: [["*", "*", "*", "*"]],
};

const modelArray = [
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];

for (let i = 0; i < figures[randomNumFig].length; i++) {
  for (let j = 0; j < figures[randomNumFig][i].length; j++) {
    if (figures[randomNumFig][i][j] === "*") {
      modelArray[randomNumRow + i][randomNumCol + j] = colorArray[randomColor];
    }
  }
}

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 10; j++) {
    if (modelArray[i][j] === "Y") {
      mainArrayDiv[i][j].style.backgroundColor = "yellow";
    } else if (modelArray[i][j] === "G") {
      mainArrayDiv[i][j].style.backgroundColor = "green";
    } else if (modelArray[i][j] === "R") {
      mainArrayDiv[i][j].style.backgroundColor = "red";
    } else if (modelArray[i][j] === "B") {
      mainArrayDiv[i][j].style.backgroundColor = "blue";
    } else if (modelArray[i][j] === "P") {
      mainArrayDiv[i][j].style.backgroundColor = "purple";
    } else if (modelArray[i][j] === "O") {
      mainArrayDiv[i][j].style.backgroundColor = "orangered";
    } else if (modelArray[i][j] === "W") {
      mainArrayDiv[i][j].style.backgroundColor = "white";
    }
  }
}
