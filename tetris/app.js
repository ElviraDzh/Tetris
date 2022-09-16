const mainArrayDiv = [];
let currentPosition = 0;

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
    0: [["*"], ["*"], ["*"], ["*"]],
    1: [["*", "*", "*", "*"]],
  },
  Square: {
    0: [
      ["*", "*"],
      ["*", "*"],
    ],
  },
  Z: {
    0: [
      ["*", "*"],
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
      ["*", "*"],
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
let randomShape = [...Object.keys(shapes)];
let randomShapesInd = Math.floor(
  Math.random() * [...Object.keys(shapes)].length
);
let randomNumRow = Math.floor(Math.random() * 18);
let randomNumColumn = Math.floor(Math.random() * 7);

const colorArray = ["B", "G", "O", "Y", "W", "P"];
let randomColor = Math.floor(Math.random() * colorArray.length);

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

function displayFigures() {
  changeShapePosition(currentPosition);
  changeBgMainArray(modelArray);
}

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") {
    currentPosition++;
    if (
      currentPosition >
      [...Object.keys(shapes[randomShape[randomShapesInd]])].length - 1
    ) {
      currentPosition = 0;
    }

    cleanModelArray();
    changeShapePosition(currentPosition);
    changeBgMainArray(modelArray);
  }
});
function cleanModelArray() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      modelArray[i][j] = "";
    }
  }
}

function changeShapePosition(position) {
  for (
    let i = 0;
    i < shapes[randomShape[randomShapesInd]][position].length;
    i++
  ) {
    for (
      let j = 0;
      j < shapes[randomShape[randomShapesInd]][position][i].length;
      j++
    ) {
      if (shapes[randomShape[randomShapesInd]][position][i][j] === "*") {
        modelArray[randomNumRow + i][randomNumColumn + j] =
          colorArray[randomColor];
      }
    }
  }
}
function changeBgMainArray(array) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (array[i][j] === "Y") {
        mainArrayDiv[i][j].style.backgroundColor = "yellow";
      } else if (array[i][j] === "G") {
        mainArrayDiv[i][j].style.backgroundColor = "green";
      } else if (array[i][j] === "R") {
        mainArrayDiv[i][j].style.backgroundColor = "red";
      } else if (array[i][j] === "B") {
        mainArrayDiv[i][j].style.backgroundColor = "blue";
      } else if (array[i][j] === "P") {
        mainArrayDiv[i][j].style.backgroundColor = "purple";
      } else if (array[i][j] === "O") {
        mainArrayDiv[i][j].style.backgroundColor = "orangered";
      } else if (array[i][j] === "W") {
        mainArrayDiv[i][j].style.backgroundColor = "white";
      } else {
        mainArrayDiv[i][j].style.backgroundColor = "transparent";
      }
    }
  }
}
