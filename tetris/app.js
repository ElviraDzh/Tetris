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
  width:39px;
  height:39px;
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

// function play() {
//   makeRect();
//   startInterval();
// }

// function pause() {
//   paused = !paused;
// }

// function startInterval() {
//   if (timerInterval === null) {
//     timerInterval = setInterval(goDown, 1000);
//   }
// }

// function moveShape() {
//   let transformAttr = "translate(" + currentX + "," + currentY + ")";
//   rect.setAttribute("transform", transformAttr);
// }

// function goDown() {
//   if (paused) return;

//   if (currentY <= 720) {
//     currentY += 40;
//     moveShape();
//     console.log("down:" + currentY);
//   } else if (currentY === 760) {
//     currentX = 0;
//     currentY = 0;
//     makeRect();
//   }
// }

// document.addEventListener("keydown", (e) => {
//   switch (e.code) {
//     case "ArrowLeft":
//       //left
//       if (currentX >= -120) {
//         currentX -= 40;
//         moveShape();
//         console.log("left:" + currentX);
//       }
//       break;
//     case "ArrowRight":
//       //right
//       if (currentX <= 160) {
//         currentX += 40;
//         moveShape();
//         console.log("right:" + currentX);
//       }
//       break;
//     case "ArrowDown":
//       //down
//       goDown();
//       break;
//   }
// });
let currentRow = 0;
let currentColumn = 4;
let currentPosition = 0;

function displayFigures() {
  moveShape(currentPosition);
  changeBgMainArray();
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
      p("arrowRight:");
      p(currentColumn, "currentColumn");
      const len = randomShape[currentPosition][0].length;
      p(len, "len");
      if (len + currentColumn < 10) {
        currentColumn++;
        cleanModelArray();
        moveShape(currentPosition);
        changeBgMainArray();
      }
      break;
    case "ArrowDown":
      //down;
      if (currentRow < 20) {
        currentRow++;
        cleanModelArray();
        moveShape(currentPosition);
        changeBgMainArray();
      }
      break;
  }
});

function cleanModelArray() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      modelArray[i][j] = "";
    }
  }
}
let shapeKeys = [...Object.keys(shapes)];
p(shapeKeys, "shapeKeys");
let randomShapeIndex = Math.floor(
  Math.random() * [...Object.keys(shapes)].length
);
let shapeKey = shapeKeys[randomShapeIndex];
p(shapeKey, "shapeKey");
const randomShape = shapes[shapeKey];
//const randomShape = shapes["I"];
p(Object.keys(randomShape).length);

// let randomNumRow = Math.floor(Math.random() * 19);
let randomNumRow = 0;
//let randomNumColumn = Math.floor(Math.random() * 9);
let randomNumColumn = 4;

const colorArray = ["B", "G", "O", "Y", "W", "P"];
let randomColor = Math.floor(Math.random() * colorArray.length);

function moveShape(position) {
  // Z: {
  //   0: [
  //     ["*", "*", " "],
  //     [" ", "*", "*"],
  //   ],
  //   1: [
  //     ["", "*"],
  //     ["*", "*"],
  //     ["*", ""],
  //   ],
  // },
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
}

function rotateShape() {
  p("rotateShape: ");
  currentPosition++;
  if (currentPosition > Object.keys(randomShape).length - 1) {
    currentPosition = 0;
  }
  const len = randomShape[currentPosition][0].length;
  p(len, "len");
  p(currentColumn, "currentColumn");
  if (currentColumn + len > 9) {
    currentColumn = 10 - len;
  }
  const twoDimArr = randomShape[currentPosition];

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
  p(modelArray);
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
        default:
          mainArrayDiv[i][j].style.backgroundColor = "transparent";
      }
    }
  }
}
