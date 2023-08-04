let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let animate;

const player = new Player(canvasWidth / 2, 600, 50, 50);
const building1 = new Building(400, 800, 90, 40);
const building2 = new Building(800, 800, 90, 40);
const building3 = new Building(1200, 800, 90, 40);

let allEnemies = [];
let allBuildings = [building1, building2, building3];
let enemyCooldown = 120;
let minibossCoolDown = 80;
let playerProjectiles = player.projectiles;

let state = "Play";
let minibossProjectiles = [];

const gameOver = document.getElementById("game-over");
const gameOverBtn = document.getElementById("game-over-btn");
// const hpText = document.getElementById('hp-text');
const scoreText = document.getElementById("score-text");
const hpBar = document.getElementById("hp-bar");
let hpWidth = 100 / player.healthPoints;

let background = new Image();
background.src = "./assets/space.png";
let background_y = 0;

gameOverBtn.addEventListener("click", () => {
  player.healthPoints = 3;
  player.projectiles = [];
  allEnemies = [];
  allBuildings = [];
  gameOver.style.display = "none";
  player.score = 0;
  allBuildings.push(building1, building2, building3);
  // building1.x = 400;
  // building1.y = 800;
  // building2.x = 800;
  // building2.y = 800;
  // building3.x = 1200;
  // building3.y = 800;
  state = "Play";
});

function animation() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  animate = requestAnimationFrame(animation);
  // canvasWidth = window.innerWidth;
  // canvasHeight = window.innerHeight;
  // canvas.width = canvasWidth;
  // canvas.height = canvasHeight;

  gameStates();

  if (state === "Play") {
    if (player && building1 && building2 && building3) {
      loopBackground();

      player.draw(ctx);

      player.control(canvasWidth, canvasHeight);
      playerProjectiles = player.projectiles;
    }

    enemyCooldown--;

    if (enemyCooldown <= 0) {
      enemySpawn();
      enemyCooldown = 120;
    }

    minibossSpawn();
    minibossProjectiles = [];

    allEnemies = allEnemies.filter((e) => e.isAlive);
    allBuildings = allBuildings.filter((b) => b.isAlive);

    for (let i = 0; i < allBuildings.length; i++) {
      const building = allBuildings[i];
      building.draw(ctx);
    }

    for (let i = 0; i < allEnemies.length; i++) {
      const enemy = allEnemies[i];
      enemy.draw(ctx);
      enemy.move(canvasHeight);

      if (enemy.projectiles) {
        minibossProjectiles.push(...enemy.projectiles);
      }
    }
  } else if (state === "GameOver") {
    gameOver.style.display = "flex";
  }

  enemyCollision();
  //    hpText.innerText = "Health: " + player.healthPoints;
  scoreText.innerText = "Score: " + player.score;

  hpBar.style.width = hpWidth * player.healthPoints + "%";
}

function enemySpawn() {
  const randomX = Math.random() * (canvasWidth - 50);
  let enemy = new BaseEnemy(randomX, -50, 50, 50);
  allEnemies.push(enemy);
}

function minibossSpawn() {
  minibossCoolDown--;
  if (minibossCoolDown <= 0) {
    let xPosition = Math.random() < 0.5 ? 0 - 128 : canvasWidth;
    let miniboss = new Miniboss(xPosition, 120, 128, 84);
    miniboss.score = 1000;
    miniboss.speed = xPosition < 0.5 ? 2 : -2;
    allEnemies.push(miniboss);
    minibossCoolDown = 1200;
  }
}

function enemyCollision() {
  let playerAssets = [player, ...allBuildings, ...playerProjectiles];
  let enemyAssets = [...allEnemies, ...minibossProjectiles];

  for (let i = 0; i < playerAssets.length; i++) {
    const pA = playerAssets[i];
    for (let j = 0; j < enemyAssets.length; j++) {
      const enemy = enemyAssets[j];
      if (
        enemy.x < pA.x + pA.width &&
        enemy.x + enemy.width > pA.x &&
        enemy.y < pA.y + pA.height &&
        enemy.y + enemy.height > pA.y
      ) {
        console.log("collision");
        enemy.healthPoints--;
        pA.healthPoints--;
        if (pA.isBuilding) {
          pA.isAlive = pA.healthPoints <= 0 ? false : true;
          console.log(pA.isAlive, pA.healthPoints);
        }
        enemy.death();
        if (!enemy.isAlive && enemy.score && !pA.isPlayer && !pA.isBuilding) {
          player.score += enemy.score;
        }
      }
    }
  }
}

function gameStates() {
  switch (state) {
    case "Play":
      if (
        !allBuildings[0].isAlive &&
        !allBuildings[1].isAlive &&
        !allBuildings[2].isAlive &&
        allBuildings.length > 0
      ) {
        state = "GameOver";
      }

      break;
    case "GameOver":
      break;
    default:
      break;
  }
}

function loopBackground() {
  ctx.drawImage(background, 0, background_y, canvasWidth, canvasHeight);
  ctx.drawImage(
    background,
    0,
    background_y - canvasHeight,
    canvasWidth,
    canvasHeight
  );
  background_y++;
  if (background_y >= canvasHeight) {
    background_y = 0;
  }
}

animation();
