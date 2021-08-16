const treeStart = document.querySelector(".tree-container");
const fruitInput = document.querySelector("#fruit-input");
const rotateInput = document.querySelector("#rotate-input");
const heightInput = document.querySelector("#height-input");
const recursionInput = document.querySelector("#recursion-input");
const leafInput = document.querySelector("#leaf-input");
const lengthInput = document.querySelector("#length-input");
const widthInput = document.querySelector("#width-input");
const windInput = document.querySelector("#wind-input");
const angleInput = document.querySelector("#angle-input");
const addWind = document.querySelector(".add-wind");
const addTree = document.querySelector(".new-tree");
const hideHud = document.querySelector(".hide-hud");

let hiddenHud = false;

const newBranch = async (h, w, o, r, c) => {
  if (w < 1) {
    w = 1;
  }
  let numOfBranches = 2;
  let rotate = 36;
  let angle = (rotate * 2) / (numOfBranches - 1);
  rotate = rotateInput.value;
  let angles = -rotate;
  angle = (rotate * 2) / (numOfBranches - 1);
  let randomHeight =
    (Math.floor(Math.random() * lengthInput.value) +
      (80 - lengthInput.value / 2)) /
    100;
  let height = h * randomHeight;
  let width = w;
  let randomRotate =
    (Math.floor(Math.random() * angleInput.value) +
      (100 - angleInput.value / 8)) /
    100;
  let branch = document.createElement("div");
  branch.classList.add("branch");
  branch.style = `height: ${height}px; width: ${width}px; position: absolute; bottom: 99%; left: 10%; background-color: rgb(155, ${
    50 + c
  }, 40); transform: rotate(${
    r * randomRotate
  }deg); transform-origin: bottom; animation: branch 200ms linear; transition: 4s ease-in-out`;
  o.appendChild(branch);
  if (h > recursionInput.value) {
    await sleep(200);
    for (i = 0; i < numOfBranches; i++) {
      newBranch((h * heightInput.value) / 100, w * 0.8, branch, angles, c + 15);
      angles = angles + angle;
    }
  } else {
    let leafChance = Math.floor(Math.random() * 100);
    let fruitChance = Math.floor(Math.random() * 100);

    if (leafChance < leafInput.value) {
      createLeaf(branch);
    }

    if (fruitChance < fruitInput.value) {
      createFruit(branch);
    }
  }
};

const createLeaf = (o) => {
  let leaf = document.createElement("div");
  leaf.innerHTML = '<i class="fas fa-leaf leaf"></i>';
  o.appendChild(leaf);
};

const createFruit = (o) => {
  let fruit = document.createElement("div");
  fruit.innerHTML = '<i class="fas fa-apple-alt fruit"></i>';
  o.appendChild(fruit);
};

document.body.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    treeStart.innerHTML = "";
    newBranch(
      280 * (heightInput.value / 100),
      widthInput.value,
      treeStart,
      0,
      0
    );
  }
});

document.body.addEventListener("click", () => {
  if (hiddenHud == true) {
    hiddenHud = false;
    document.querySelector(".details-container").style = "";
    document.querySelector(".hud").innerText = "";
  }
});

addTree.addEventListener("click", () => {
  document.querySelector(".start").style.display = "none";
  treeStart.innerHTML = "";
  newBranch(280 * (heightInput.value / 100), widthInput.value, treeStart, 0, 0);
});

hideHud.addEventListener("click", async () => {
  document.querySelector(".details-container").style = "display: none;";
  await sleep(1);
  document.querySelector(".hud").innerText = "Click anywhere to show hud.";
  hiddenHud = true;
});

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const wind = () => {
  document.querySelectorAll(".branch").forEach((bran) => {
    let temp = bran.style.transform;
    bran.style.transform =
      bran.style.transform +
      `rotateZ(${Math.floor(Math.random() * windInput.value)}deg)`;
    setTimeout(() => {
      bran.style.transform = temp;
    }, 4000);
  });
};
let Wind = "";
addWind.addEventListener("click", () => {
  if (Wind == "") {
    addWind.innerHTML = "Stop Wind";
    addWind.style = "color: darkred;";
    wind();
    Wind = setInterval(wind, 8000);
  } else {
    addWind.innerHTML = "Add Wind";
    addWind.style = "";
    clearInterval(Wind);
    Wind = "";
  }
});
