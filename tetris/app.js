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
//let len;
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

const createDiv = () => {
  const newDiv = document.createElement("div");
  newDiv.style.cssText = `
  width:35px;
  height:35px;
  border-bottom:1px solid grey;
  border-right:1px solid grey;`;
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

let currentRow = 0;
let currentColumn = 4;
let currentPosition = 0;

function displayFigures() {
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
    console.log(s);
  }
}

function canMoveDown() {
  const twoDimLength = randomShape[currentPosition].length;
  p("canMoveDown:");
  p("=1=");
  pa(modelArray);
  p(twoDimLength, "twoDimLength");
  p(currentRow, "currentRow");
  p("=2=");
  if (parseInt(twoDimLength) + parseInt(currentRow) >= 21) {
    return false;
  }
  p("=3=");
  for (let i = 0; i < modelArray.length - 1; i++) {
    for (let j = 0; j < modelArray[i].length; j++) {
      if (
        modelArray[i][j] !== "" &&
        modelArray[i][j] !== "-" &&
        modelArray[i + 1][j] === "-"
      ) {
        return false;
      }
    }
  }
  p("=4=");
  return true;
}

function goDown() {
  if (paused) return;

  const twoDimLength = randomShape[currentPosition].length;
  p(currentRow, "currentRow");
  p(twoDimLength, "TwoDimLength");
  // if (twoDimLength + currentRow < 21) {
  if (canMoveDown()) {
    // for (
    //   let i = currentRow + twoDimLength;
    //   i <= currentRow + twoDimLength;
    //   i++
    // ) {
    //   for (let j = currentColumn; j < currentColumn + 4; j++) {
    //     if (modelArray[i]?.[j] === "-") {
    //       p("save position");
    //       savePosition();

    //       //clearInterval(timerInterval);
    //     } else {
    //       cleanModelArray();
    //       moveShape(currentPosition);
    //       changeBgMainArray();
    //     }
    //   }
    // }

    cleanModelArray();
    moveShape(currentPosition);
    changeBgMainArray();
    currentRow++;
  } else {
    // else if (twoDimLength + currentRow === 21) {
    p("reached bottom");
    savePosition();
    nextShape();
    currentColumn = 4;
    currentRow = 0;
    currentPosition = 0;
    moveShape(currentPosition);
    changeBgMainArray();
  }
}
// function checkNextRow() {
//   const twoDimLength = randomShape[currentPosition].length;
//   p(currentColumn, "currentColumn");
//   p(twoDimLength, "length");
//   for (let i = currentRow + twoDimLength; i < 3; i++) {
//     p("it works");
//     for (let j = currentColumn; j < 4; j++) {
//       p(modelArray[i][j]);
//       if (modelArray[i][j] === "-") {
//         savePosition();
//       }
//     }
//   }
// }

function startInterval() {
  if (timerInterval === null) {
    timerInterval = setInterval(goDown, 1000);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      //up
      cleanModelArray();
      rotateShape();
      changeBgMainArray();

      break;

    case "ArrowLeft":
      //left
      p(currentColumn);
      if (currentColumn > 0) {
        currentColumn--;
        cleanModelArray();
        moveShape(currentPosition);
        changeBgMainArray();
      }
      break;

    case "ArrowRight":
      //right
      len = randomShape[currentPosition][0].length;
      p(len, "Length");
      if (len + currentColumn < 10) {
        currentColumn++;
        cleanModelArray();
        moveShape(currentPosition);
        changeBgMainArray();
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

function cleanModelArray() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (modelArray[i][j] !== "-") {
        modelArray[i][j] = "";
      }
    }
  }
}

let randomColor;
let randomShape;

const colorArray = ["B", "G", "O", "Y", "W", "P"];
let shapeKeys = [...Object.keys(shapes)];
let randomNumRow = 0;
let randomNumColumn = 4;

function nextShape() {
  randomColor = Math.floor(Math.random() * colorArray.length);

  let randomShapeIndex = Math.floor(
    Math.random() * [...Object.keys(shapes)].length
  );
  let shapeKey = shapeKeys[randomShapeIndex];
  randomShape = shapes[shapeKey];
}
nextShape();

function moveShape(position) {
  for (
    let i = 0;
    i < randomShape[position].length; //2
    i++ // shapeRow
  )
    for (let j = 0; j < randomShape[position][i].length; j++) {
      //3
      // shapeColumn
      if (randomShape[position][i][j] === "*") {
        modelArray[currentRow + i][currentColumn + j] = colorArray[randomColor];
      }
    }
  //return randomShape[position][i].length;
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

function changeBgMainArray() {
  for (let i = 0; i < modelArray.length; i++) {
    for (let j = 0; j < modelArray[i].length; j++) {
      switch (modelArray[i][j]) {
        case "Y":
          mainArrayDiv[i][j].style.backgroundColor = "yellow";
          break;
        case "G":
          mainArrayDiv[i][j].style.backgroundColor = "green";
          break;
        case "R":
          mainArrayDiv[i][j].style.backgroundColor = "red";
          break;
        case "B":
          mainArrayDiv[i][j].style.backgroundColor = "blue";
          break;
        case "P":
          mainArrayDiv[i][j].style.backgroundColor = "purple";
          break;
        case "O":
          mainArrayDiv[i][j].style.backgroundColor = "orangered";
          break;
        case "W":
          mainArrayDiv[i][j].style.backgroundColor = "white";
          break;
        case "-":
          mainArrayDiv[i][j].style.backgroundColor = "pink";
          break;
        default:
          mainArrayDiv[i][j].style.backgroundColor = "transparent";
      }
    }
  }
}
