let currentX = 0;
let currentY = 0;

function moveShape(idStr, x, y) {
  const square = document.getElementById("square");
  if (square) {
    let transformAttr = " translate(" + x + "," + y + ")";
    square.setAttribute("transform", transformAttr);
  }
}
moveShape("square", 0, 0);

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      moveShape("square", currentX - 40, currentY);
      console.log("left:" + currentY);
      currentX -= 40;
      break;
    case 38:
      moveShape("square", currentX, currentY - 40);
      currentY -= 40;
      console.log("up:" + currentY);
      break;
    case 39:
      moveShape("square", currentX + 40, currentY);
      currentX += 40;
      console.log("right:" + currentX);
      break;
    case 40:
      moveShape("square", currentX, currentY + 40);
      currentY += 40;
      console.log("down:" + currentY);
      break;
  }
});
