let movingBox = document.getElementById("moving-box");
let toggleButton = document.getElementById("toggle-animation");
let position = 0;
let movingRight = true;
let animationInterval = null;
toggleButton.onclick = function () {
  if (toggleButton.innerText === "Start Animation") {
    toggleButton.innerText = "Pause Animation";
    startAnimation();
  } else {
    toggleButton.innerText = "Start Animation";
    stopAnimation();
  }
};
function startAnimation() {
  animationInterval = setInterval(() => {
    if (movingRight) {
      position += 5;
    } else {
      position -= 5;
    }
    if (position >= 300) {
      movingRight = false;
    } else if (position <= 0) {
      movingRight = true;
    }

    movingBox.style.left = position + "px";
  }, 20);
}
function stopAnimation() {
  clearInterval(animationInterval);
}
