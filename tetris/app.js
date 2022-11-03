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

let currentRow = 0;
let currentColumn = 4;
let currentPosition = 0;

function displayFigures() {
  displayInNextBlock();
  startInterval();
}

function pause() {
  paused = !paused;
}

function pa(arr) {
  for (let i = 0; i < arr.length; i++) {
    let s = "";
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "" || arr[i][j] === " ") {
        s += "_ ";
      } else {
        s += arr[i][j] + " ";
      }
    }
  }
}

function canMoveDown() {
  const twoDimLength = randomShape[currentPosition].length;
  if (parseInt(twoDimLength) + parseInt(currentRow) >= 21) {
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

function goDown() {
  if (paused) return;
  pa(modelArray);
  if (canMoveDown()) {
    cleanArray(modelArray);
    moveShape();
    changeBgMainArray(modelArray, mainArrayDiv);
    currentRow++;
  } else {
    savePosition();
    for (let i = 0; i < modelArray.length; i++) {
      let count = 0;
      for (let j = 0; j < modelArray[i].length; j++) {
        p(modelArray[i][j]);
        if (modelArray[i][j] === "-") {
          count++;
        }
      }
      p(count, "count");
      if (count === 10) {
        p(i, "remove Row");
        modelArray.splice(i, 1);
        modelArray.unshift(["", "", "", "", "", "", "", "", "", ""]);
      }
    }

    p("reached bottom");
    nextShape();
    displayInNextBlock();
    currentColumn = 4;
    currentRow = 0;
    currentPosition = 0;
    moveShape();
    changeBgMainArray(modelArray, mainArrayDiv);
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
      cleanArray(modelArray);
      rotateShape();
      changeBgMainArray(modelArray, mainArrayDiv);

      break;

    case "ArrowLeft":
      //left
      p(currentColumn);
      if (currentColumn > 0) {
        currentColumn--;
        cleanArray(modelArray);
        moveShape();
        changeBgMainArray(modelArray, mainArrayDiv);
      }
      break;

    case "ArrowRight":
      //right
      len = randomShape[currentPosition][0].length;
      p(len, "Length");
      if (len + currentColumn < 10) {
        currentColumn++;
        cleanArray(modelArray);
        moveShape();
        changeBgMainArray(modelArray, mainArrayDiv);
      }
      break;
    case "ArrowDown":
      //down;
      goDown();
      break;
  }
});

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
  let shapeKey = shapeKeys[randomShapeIndex];
  p(shapeKey, "shapeKey");
  nextRandomShape = shapes[shapeKey];
  p(nextRandomShape);
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

function moveShape() {
  for (
    let i = 0;
    i < randomShape[currentPosition].length; //2
    i++ // shapeRow
  ) {
    for (let j = 0; j < randomShape[currentPosition][i].length; j++) {
      //3
      // shapeColumn
      if (randomShape[currentPosition][i][j] === "*") {
        modelArray[currentRow + i][currentColumn + j] = colorArray[randomColor];
      }
    }
  }
  console.log(modelArray);
  doProjection();
}
console.log(modelArray.length);
console.log(randomShape[currentPosition].length);

function getProjectionRow() {
  const h = randomShape[currentPosition].length;
  const w = randomShape[currentPosition][0].length;
  const shape = randomShape[currentPosition];
  pa(modelArray);
  for (let mi = currentRow + 1; mi < modelArray.length - h; mi++) {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        p(mi, "mi");
        if (
          shape[i][j] === "*" &&
          modelArray[mi + i + 1][currentColumn + j] === "-"
        ) {
          let r = mi + h - 1;
          p(r, "result: ");
          return r;
        }
      }
    }
  }

  return modelArray.length - 1;
}

function doProjection() {
  let projectionRow = getProjectionRow();
  p(projectionRow, "projectionRow");
  let startRow = projectionRow - randomShape[currentPosition].length + 1;
  for (
    let i = 0;
    i < randomShape[currentPosition].length; //2
    i++ // shapeRow
  ) {
    for (let j = 0; j < randomShape[currentPosition][0].length; j++) {
      //3
      // shapeColumn
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
  p("rotateShape: ");
  currentPosition++;
  if (currentPosition > Object.keys(randomShape).length - 1) {
    currentPosition = 0;
  }
  len = randomShape[currentPosition][0].length;
  p(len, "len");
  p(currentColumn, "currentColumn");
  if (currentColumn + len > 9) {
    currentColumn = 10 - len;
  }
  const twoDimArr = randomShape[currentPosition];
  if (currentRow + twoDimArr.length > 16) {
    currentRow = 20 - twoDimArr.length;
  }
  p(currentColumn, "currentColumn");
  for (
    let i = 0;
    i < twoDimArr.length;
    i++ //row
  )
    for (let j = 0; j < twoDimArr[i].length; j++) {
      // column
      if (twoDimArr[i][j] === "*") {
        modelArray[currentRow + i][currentColumn + j] = colorArray[randomColor];
      }
    }
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
