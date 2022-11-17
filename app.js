function p(v, s) {
  if (s === null || s === undefined) {
    console.log(v);
  } else {
    console.log(s + ": " + v);
  }
}

let timerInterval = null;
let paused = false;
const mainArrayDiv = [];
const nextBlockArray = [];
let nextShapeMainBlock;

let randomColor;
let randomShape;
let nextRandomShape = null;
let nextRandomColor;

const colorArray = ["B", "G", "O", "Y", "W", "P"];

let randomNumRow = 0;
let randomNumColumn = 4;

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

const shapes = {
  L: {
    0: [
      ["*", ""],
      ["*", ""],
      ["*", "*"],
    ],
    1: [
      ["*", "*", "*"],
      ["*", "", ""],
    ],
    2: [
      ["*", "*"],
      ["", "*"],
      ["", "*"],
    ],
    3: [
      ["", "", "*"],
      ["*", "*", "*"],
    ],
  },
  oppositeL: {
    0: [
      ["", "*"],
      ["", "*"],
      ["*", "*"],
    ],
    1: [
      ["*", "", ""],
      ["*", "*", "*"],
    ],
    2: [
      ["*", "*"],
      ["*", ""],
      ["*", ""],
    ],
    3: [
      ["*", "*", "*"],
      ["", "", "*"],
    ],
  },
  I: {
    0: [["*"], ["*"], ["*"], ["*"]], // 0: length: 1;
    1: [["*", "*", "*", "*"]], // 1: length: 4;
  },
  square: {
    0: [
      ["*", "*"],
      ["*", "*"],
    ],
  },
  Z: {
    0: [
      ["*", "*", ""],
      ["", "*", "*"],
    ],
    1: [
      ["", "*"],
      ["*", "*"],
      ["*", ""],
    ],
  },
  oppositeZ: {
    0: [
      ["", "*", "*"],
      ["*", "*", ""],
    ],
    1: [
      ["*", ""],
      ["*", "*"],
      ["", "*"],
    ],
  },
  triangle: {
    0: [
      ["", "*", ""],
      ["*", "*", "*"],
    ],
    1: [
      ["*", ""],
      ["*", "*"],
      ["*", ""],
    ],
    2: [
      ["*", "*", "*"],
      ["", "*", ""],
    ],
    3: [
      ["", "*"],
      ["*", "*"],
      ["", "*"],
    ],
  },
};
let shapeKeys = Object.keys(shapes); //["L", "oppositeL", "I", "square", "Z", "oppositeZ, "triangle"]
p(shapeKeys);
const createDiv = (id, size) => {
  const newDiv = document.createElement("div");
  newDiv.style.cssText = `
  width: ${size};
  height: ${size};
  border-bottom:1px solid grey;
  border-right:1px solid grey;`;
  const area = document.getElementById(`${id}`);
  area.append(newDiv);

  return newDiv;
};

function createDivArray() {
  for (let i = 0; i < 20; i++) {
    const array = [];
    for (let j = 0; j < 10; j++) {
      const div = createDiv("playArea", "32px");
      array[j] = div;
    }
    mainArrayDiv.push(array);
  }
}

createDivArray();

////////////////////// Next block/////////////////////////////////////////

function createArrayNextShape() {
  for (let i = 0; i < 5; i++) {
    const array = [];
    for (let j = 0; j < 6; j++) {
      const div = createDiv("nextFigure", "15px");
      array[j] = div;
    }
    nextBlockArray.push(array);
  }
}
p(nextBlockArray);
createArrayNextShape();

const modelArrayNextShape = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

function displayInNextBlock() {
  cleanArray(modelArrayNextShape);
  for (
    let i = 0;
    i < nextRandomShape[0].length; //2
    i++ // shapeRow
  )
    for (let j = 0; j < nextRandomShape[0][i].length; j++) {
      //3
      // shapeColumn
      if (nextRandomShape[0][i][j] === "*") {
        modelArrayNextShape[1 + i][2 + j] = colorArray[nextRandomColor];
      }
    }
  changeBgMainArray(modelArrayNextShape, nextBlockArray);
}

//////////////////////////////////////////////////////////////////////////////

let currentRow = -1;
let currentColumn = 4;
let currentPosition = 0;

function displayFigures() {
  displayInNextBlock();
  startInterval();
}

function pause() {
  paused = !paused;
}

function pa(arr, str) {
  if (str != undefined) console.log(str + ": ");

  for (let i = 0; i < arr.length; i++) {
    let s = "";
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "" || arr[i][j] === " ") {
        s += "_ ";
      } else {
        s += arr[i][j] + " ";
      }
    }
    console.log(s);
  }
}

function canMoveDown() {
  const height = randomShape[currentPosition].length;

  if (height + currentRow >= 20) {
    return false;
  }
  for (let i = 0; i < modelArray.length - 1; i++) {
    for (let j = 0; j < modelArray[i].length; j++) {
      if (
        modelArray[i][j] !== "" &&
        modelArray[i][j] !== "-" &&
        modelArray[i][j] !== "S" &&
        modelArray[i + 1][j] === "-"
      ) {
        return false;
      }
    }
  }
  return true;
}

let lineScore = 0;
let levelScore = 1;

function goDown() {
  if (paused) return;

  if (canMoveDown()) {
    currentRow++;
    cleanArray(modelArray);
    copyShapeToModelArray();
    changeBgMainArray(modelArray, mainArrayDiv);
  } else {
    savePosition();
    for (let i = 0; i < modelArray.length; i++) {
      let count = 0;
      for (let j = 0; j < modelArray[i].length; j++) {
        if (modelArray[i][j] === "-") {
          count++;
        }
      }
      if (count === 10) {
        lineScore++;
        p(lineScore, "Lines");
        if (lineScore < 10) {
          document.getElementById("userLines").innerHTML = lineScore;
        } else if (lineScore === 10) {
          levelScore++;
          lineScore = 0;
          document.getElementById("userLevel").innerHTML = levelScore;
          document.getElementById("userLines").innerHTML = lineScore;
        }
        modelArray.splice(i, 1);
        modelArray.unshift(["", "", "", "", "", "", "", "", "", ""]);
      }
    }
    nextShape();
    displayInNextBlock();
    currentColumn = 4;
    currentRow = -1;
    currentPosition = 0;
    gameOver();
  }
}

function gameOver() {
  const shape = randomShape[currentPosition];
  const h = shape.length;
  const w = shape[0].length;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (modelArray[i][currentColumn + j] === "-" && shape[i][j] === "*") {
        clearInterval(timerInterval);
        document.querySelector(".game-over").style.display = "block";
      }
    }
  }
}

function startInterval() {
  if (timerInterval === null) {
    timerInterval = setInterval(goDown, 1000);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      //up
      if (paused) return;
      if (canRotateShape()) {
        cleanArray(modelArray);
        rotateShape();
        changeBgMainArray(modelArray, mainArrayDiv);
      }

      break;

    case "ArrowLeft":
      //left
      if (paused) return;

      if (canMoveLeft()) {
        currentColumn--;
        cleanArray(modelArray);
        copyShapeToModelArray();
        changeBgMainArray(modelArray, mainArrayDiv);
      }

      break;

    case "ArrowRight":
      //right
      if (paused) return;

      if (canMoveRight()) {
        currentColumn++;
        cleanArray(modelArray);
        copyShapeToModelArray();
        changeBgMainArray(modelArray, mainArrayDiv);
      }
      break;
    case "ArrowDown":
      //down;
      goDown();
      break;
  }
});

function canMoveLeft() {
  const shape = randomShape[currentPosition];
  const height = shape.length;
  const width = shape[0].length;

  if (currentColumn === 0 || height + currentRow >= 21 || currentRow < 0) {
    return false;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (
        modelArray[currentRow + i][currentColumn + j - 1] === "-" &&
        shape[i][j] === "*"
      ) {
        return false;
      }
    }
  }
  return true;
}

function canMoveRight() {
  const shape = randomShape[currentPosition];
  const height = shape.length;
  const width = shape[0].length;

  if (
    width + currentColumn === 10 ||
    height + currentRow >= 21 ||
    currentRow < 0
  ) {
    return false;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (
        modelArray[currentRow + i][currentColumn + j + 1] === "-" &&
        shape[i][j] === "*"
      ) {
        return false;
      }
    }
  }
  return true;
}

function canRotateShape() {
  pa(randomShape[currentPosition], "canRotateShape: randomShape");
  p(currentRow, "currentRow");
  p(currentColumn, "currentColumn");

  let position = currentPosition;
  position++;

  if (position > Object.keys(randomShape).length - 1) {
    position = 0;
  }

  const shape = randomShape[position];
  const height = shape.length;
  const width = shape[0].length;

  if (currentRow < 0 || currentRow + height > 19) {
    return false;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (
        modelArray[currentRow + i][currentColumn + j] === "-" &&
        shape[i][j] === "*"
      ) {
        return false;
      }
    }
  }
  return true;
}

function savePosition() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        modelArray[i][j] === "B" ||
        modelArray[i][j] === "G" ||
        modelArray[i][j] === "O" ||
        modelArray[i][j] === "Y" ||
        modelArray[i][j] === "W" ||
        modelArray[i][j] === "P"
      ) {
        modelArray[i][j] = "-";
      }
    }
  }
}

function cleanArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] !== "-") {
        arr[i][j] = "";
      }
    }
  }
}

function prepareNextShape() {
  nextRandomColor = Math.floor(Math.random() * colorArray.length);

  let randomShapeIndex = Math.floor(Math.random() * Object.keys(shapes).length);
  let shapeKey = shapeKeys[randomShapeIndex]; // "L"
  nextRandomShape = shapes[shapeKey]; //object "L"
}

function nextShape() {
  if (nextRandomShape === null) {
    prepareNextShape();
  }

  randomShape = nextRandomShape;
  randomColor = nextRandomColor;
  prepareNextShape();
}

nextShape();

function copyShapeToModelArray() {
  const shape = randomShape[currentPosition];
  const h = shape.length;
  const w = shape[0].length;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (shape[i][j] === "*") {
        modelArray[currentRow + i][currentColumn + j] = colorArray[randomColor];
      }
    }
  }
  doProjection();
}

function getProjectionRow() {
  const h = randomShape[currentPosition].length;
  const w = randomShape[currentPosition][0].length;
  const shape = randomShape[currentPosition];

  for (let mi = currentRow; mi < modelArray.length - h; mi++) {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (
          shape[i][j] === "*" &&
          modelArray[mi + i + 1][currentColumn + j] === "-"
        ) {
          let r = mi + h - 1;
          return r;
        }
      }
    }
  }

  return modelArray.length - 1;
}

function doProjection() {
  let projectionRow = getProjectionRow();
  let startRow = projectionRow - randomShape[currentPosition].length + 1;
  for (
    let i = 0;
    i < randomShape[currentPosition].length; //2
    i++
  ) {
    for (let j = 0; j < randomShape[currentPosition][0].length; j++) {
      if (
        randomShape[currentPosition][i][j] === "*" &&
        modelArray[startRow + i][currentColumn + j] === ""
      ) {
        modelArray[startRow + i][currentColumn + j] = "S";
      }
    }
  }
}

function rotateShape() {
  currentPosition++;
  if (currentPosition > Object.keys(randomShape).length - 1) {
    currentPosition = 0;
  }
  const shape = randomShape[currentPosition];
  const h = shape.length;
  const w = shape[0].length;

  // len = randomShape[currentPosition][0].length;

  if (currentColumn + w > 9) {
    currentColumn = 10 - w;
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (shape[i][j] === "*") {
        modelArray[currentRow + i][currentColumn + j] = colorArray[randomColor];
      }
    }
  }

  doProjection();
}

function changeBgMainArray(modelArr, mainArr) {
  for (let i = 0; i < modelArr.length; i++) {
    for (let j = 0; j < modelArr[i].length; j++) {
      switch (modelArr[i][j]) {
        case "Y":
          mainArr[i][j].style.backgroundColor = "yellow";
          break;
        case "G":
          mainArr[i][j].style.backgroundColor = "green";
          break;
        case "R":
          mainArr[i][j].style.backgroundColor = "red";
          break;
        case "B":
          mainArr[i][j].style.backgroundColor = "blue";
          break;
        case "P":
          mainArr[i][j].style.backgroundColor = "purple";
          break;
        case "O":
          mainArr[i][j].style.backgroundColor = "orangered";
          break;
        case "W":
          mainArr[i][j].style.backgroundColor = "white";
          break;
        case "-":
          mainArr[i][j].style.backgroundColor = "pink";
          break;
        case "S":
          mainArr[i][j].style.backgroundColor = "rgb(32, 26, 26)";
          break;
        default:
          mainArr[i][j].style.backgroundColor = "transparent";
      }
    }
  }
}
