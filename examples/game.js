const canvas = require('../lib/index.js')



var ctx = new canvas.TerminalContext(20, 40);
ctx.style = canvas.colors.blue;


class Enemy {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = speed
    this.target = {}
  }
  updateTarget(x, y) {
    this.target.x = x;
    this.target.y = y;
  }
  move() {
    var center = { x: Math.round(this.x / 2) + this.w, y: Math.round(this.y / 2) + this.h }

    if (center.x < this.target.x) {

      this.x += this.s;
    } else if (center.x > this.target.x) {
      this.x -= this.s
    }
    if (center.y < this.target.y) {
      this.y += this.s;
    } else if (center.y > this.target.y) {
      this.y -= this.s
    }
  }
  returnRect() {
    return [this.x, this.y, this.w, this.h, canvas.colors.red];
  }
}


var e1 = new Enemy(ctx.x - 10, ctx.y - 5, 10, 5, 1);

var x = 1;
var y = 1;

var dx = 0;
var dy = 0;

ctx.inputMonitors['down'] = () => {
  dy += 2;
}
ctx.inputMonitors['up'] = () => {
  dy -= 2;
}
ctx.inputMonitors['left'] = () => {
  dx -= 2;
}
ctx.inputMonitors['right'] = () => {
  dx += 2;
}


function gameLoop() {
  y += dy;
  x += dx;
  var [x, y] = normalize(dx, dy)
  var player = ctx.rect(x, y, 10, 5, canvas.colors.green);
  playerCenterX = (player[0] / 2) + player[2];
  playerCenterY = (player[1] / 2) + player[3];
  e1.updateTarget(playerCenterX, playerCenterY);
  e1.move();
  ctx.rect(...e1.returnRect())
  ctx.tick();
  if (!ctx.checkCollision(e1.returnRect(), player)) {
    setTimeout(gameLoop, 500);
  } else {
    ctx.rect(x, y, 10, 5, canvas.colors.green);
    ctx.rect(...e1.returnRect())
    ctx.text(Math.round(ctx.x / 2), Math.round(ctx.y / 2), 'YOU DIED', canvas.colors.bold)
    ctx.tick();
  }
}
function normalize(dx, dy) {
  return [Math.floor(dx / 1.01), Math.floor(dy / 1.01)]
}
module.exports['gameLoop'] = gameLoop;