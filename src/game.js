const canvas = document.getElementById('game');
const cW = canvas.width;
const cH = canvas.height;
const ctx = canvas.getContext('2d');

const config = {
  playerSpeed: 5,
  playerSize: 15,
  spawnPoint: [0, 0],
  playerAsset: 'red',
  bg: 'black',
  obstacleSize: 25,
  obstacleAsset: 'white',
  obstacles: [],
  textColor: 'white',
  winPoint: [cW - 25, cH - 25, 25, 25]
};

const maxX = cW - config.playerSize - config.playerSpeed;
const maxY = cH - config.playerSize - config.playerSpeed;

const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF >> 0).toString(16)}`;

const makeHorizontalObstacle = (x, y, width, level = 1) => {
  if (config.obstacles.length < level) {
    const levelArr = [];
    config.obstacles.push(levelArr);
  }
  let obstacle = [x, y, width, config.obstacleSize]
  config.obstacles[level - 1].push(obstacle);
};

const makeVerticalObstacle = (x, y, height, level = 1) => {
  if (config.obstacles.length < level) {
    const levelArr = [];
    config.obstacles.push(levelArr);
  }
  let obstacle = [x, y, config.obstacleSize, height]
  config.obstacles[level - 1].push(obstacle);
};

const fillBG = () => {
  ctx.fillStyle = config.bg;
  ctx.fillRect(0, 0, cW, cH);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(config.winPoint[0], config.winPoint[1], config.winPoint[2], config.winPoint[3]);
};

let keyboard = [];
let level = 1;
let touched = false;
let win = false;
let game;

class objPlayer {
  constructor() {
    this.x = config.spawnPoint[0];
    this.y = config.spawnPoint[1];
    this.asset = config.playerAsset;
    this.size = config.playerSize;
  }
  move() {
    /**  
     * e.keyCode
     * 38 up
     * 40 down
     * 39 right
     * 37 left
     */
    keyboard.forEach(code => {
      if (code === 38 && this.y > 0) {
        this.y -= config.playerSpeed;
      } else if (code === 40 && this.y <= maxY) {
        this.y += config.playerSpeed;
      } else if (code === 37 && this.x > 0) {
        this.x -= config.playerSpeed;
      } else if (code === 39 && this.x <= maxX) {
        this.x += config.playerSpeed;
      }
    });
  }
  paint() {
    ctx.fillStyle = this.asset;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  render() {
    this.paint();
    this.move();
  }
}

const player = new objPlayer();

const renderObstacle = (obstacle) => {
  level < 3 ? ctx.fillStyle = config.obstacleAsset : ctx.fillStyle = randomColor();
  ctx.fillRect(obstacle[0], obstacle[1], obstacle[2], obstacle[3]);

  if (
    player.x < (obstacle[0] + obstacle[2]) &&
    (player.x + player.size) > obstacle[0] &&
    player.y < (obstacle[1] + obstacle[3]) &&
    (player.y + player.size) > obstacle[1]
  ) touched = true;

};

const getWin = () => {
  if (
    player.x < (config.winPoint[0] + config.winPoint[2]) &&
    (player.x + player.size) > config.winPoint[0] &&
    player.y < (config.winPoint[1] + config.winPoint[3]) &&
    (player.y + player.size) > config.winPoint[1]
  ) {
    win = true;
    level += 1;
    config.playerSpeed += 1;
  }
};

const addLevels = () => {
  //level 1
  makeVerticalObstacle(50, 0, 50);
  makeHorizontalObstacle(20, 50, 245);
  makeHorizontalObstacle(20, 125, 170);
  makeVerticalObstacle(200, 125, 150);
  makeVerticalObstacle(275, 50, 225);

  // helpers
  // makeHorizontalObstacle(0, 150, 50);
  // makeHorizontalObstacle(200, 280, 25);
  // makeHorizontalObstacle(200, 310, 150);
  // makeVerticalObstacle(360, 80, 250);
  // makeVerticalObstacle(430, 0, 225);
  // makeHorizontalObstacle(400, 270, 150);
  // makeVerticalObstacle(500, 50, 200);
  // makeVerticalObstacle(570, 0, 230);
  // makeVerticalObstacle(0, 175, cH);
  // makeVerticalObstacle(cW-config.obstacleSize, 0, cH-25);
  // makeHorizontalObstacle(100, -5, cW);
  // makeHorizontalObstacle(0, cH-config.obstacleSize, cW-60);

  //level 2
  makeVerticalObstacle(50, 0, 50, 2);
  makeHorizontalObstacle(20, 50, 245, 2);
  makeHorizontalObstacle(20, 125, 170, 2);
  makeVerticalObstacle(200, 125, 150, 2);
  makeVerticalObstacle(275, 50, 225, 2);
  makeHorizontalObstacle(0, 150, 50, 2);
  makeHorizontalObstacle(200, 280, 25, 2);
  makeHorizontalObstacle(200, 310, 150, 2);
  makeVerticalObstacle(360, 80, 250, 2);
  makeVerticalObstacle(430, 0, 225, 2);

  //level 3
  makeVerticalObstacle(50, 0, 50, 3);
  makeHorizontalObstacle(20, 50, 245, 3);
  makeHorizontalObstacle(20, 125, 170, 3);
  makeVerticalObstacle(200, 125, 150, 3);
  makeVerticalObstacle(275, 50, 225, 3);
  makeHorizontalObstacle(0, 150, 50, 3);
  makeHorizontalObstacle(200, 280, 25, 3);
  makeHorizontalObstacle(200, 310, 150, 3);
  makeVerticalObstacle(360, 80, 250, 3);
  makeVerticalObstacle(430, 0, 225, 3);
  makeHorizontalObstacle(400, 270, 150, 3);
  makeVerticalObstacle(500, 50, 200, 3);

  //level 4
  makeVerticalObstacle(50, 0, 50, 4);
  makeHorizontalObstacle(20, 50, 245, 4);
  makeHorizontalObstacle(20, 125, 170, 4);
  makeVerticalObstacle(200, 125, 150, 4);
  makeVerticalObstacle(275, 50, 225, 4);
  makeHorizontalObstacle(0, 150, 50, 4);
  makeHorizontalObstacle(200, 280, 25, 4);
  makeHorizontalObstacle(200, 310, 150, 4);
  makeVerticalObstacle(360, 80, 250, 4);
  makeVerticalObstacle(430, 0, 225, 4);
  makeHorizontalObstacle(400, 270, 150, 4);
  makeVerticalObstacle(500, 50, 200, 4);
  makeVerticalObstacle(570, 0, 230, 4);
  makeVerticalObstacle(0, 175, cH, 4);
  makeVerticalObstacle(cW - config.obstacleSize, 0, cH - 25, 4);
  makeHorizontalObstacle(100, -5, cW, 4);
  makeHorizontalObstacle(0, cH - config.obstacleSize, cW - 60, 4);
}

const renderObstacles = (level) => {
  config.obstacles[level - 1].forEach(obstacle => {
    renderObstacle(obstacle);
  });
};

const init = () => {
  fillBG();
  if (!touched && !win) {
    player.render();
    renderObstacles(level);
    getWin();
    game = window.requestAnimationFrame(init);

  } else if (win) {
    ctx.fillStyle = config.textColor;
    ctx.font = '70px sans-serif';
    ctx.textAlign = "center";
    ctx.fillText('Brawo!', cW / 2, cH / 2);
    setTimeout(() => {
      if (config.obstacles[level - 1] === undefined) {
        ctx.fillStyle = config.bg;
        ctx.fillRect(0, 0, cW, cH);
        ctx.fillStyle = config.textColor;
        ctx.fillText('Przeszedłes tą grę!', cW / 2, cH / 2);
        window.cancelAnimationFrame(game);
      } else {
        player.x = config.spawnPoint[0];
        player.y = config.spawnPoint[1];
        win = false;
        setTimeout(() => {
          ctx.fillText('Kolejna runda!', cW / 2, cH / 2 + 70);
        }, 1000);
        setTimeout(() => {
          player.render();
          renderObstacles(level);
          game = window.requestAnimationFrame(init);
        }, 3000);
      }
    }, 1000);
  } else {
    ctx.fillStyle = config.textColor;
    ctx.font = '70px sans-serif';
    ctx.textAlign = 'start';
    ctx.fillText('Przegrałeś!', cW / 4, cH / 2);
    level = 1;
    player.x = config.spawnPoint[0];
    player.y = config.spawnPoint[1];
    touched = false;
    setTimeout(() => {
      player.render();
      renderObstacles(level);
      game = window.requestAnimationFrame(init);
    }, 2500);
  }
};

window.addEventListener('load', () => {
  addLevels();
  game = window.requestAnimationFrame(init);
  setTimeout(game, 250);
});

document.addEventListener('keydown', e => {
  if (keyboard.lastIndexOf(e.keyCode) === -1) keyboard.push(e.keyCode);
});

document.addEventListener('keyup', e => {
  keyboard = keyboard.filter(events => events !== e.keyCode);
});
