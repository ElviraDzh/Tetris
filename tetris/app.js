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
makeLines();

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
  switch (e.keyCode) {
    case 37:
      //left
      if (currentX >= -120) {
        currentX -= 40;
        moveShape();
        console.log("left:" + currentX);
      }
      break;
    case 39:
      //right
      if (currentX <= 160) {
        currentX += 40;
        moveShape();
        console.log("right:" + currentX);
      }
      break;
    case 40:
      //down
      goDown();
      break;
  }
});
