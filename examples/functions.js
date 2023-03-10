var canvas = require('../lib/index.js');

//set up
ctx = new canvas.TerminalContext(20, 40);
ctx.style = canvas.colors.white;


//set up input monitors

//WASD
var x = 2;
var y = 6;
ctx.inputMonitors['w'] = () => {
  y -= 1;
  print();
}
ctx.inputMonitors['a'] = () => {
  x -= 1;
  print();
}
ctx.inputMonitors['s'] = () => {
  y += 1;
  print()
}
ctx.inputMonitors['d'] = () => {
  x += 1;
  print();
}
ctx.inputMonitors['q'] = ()=>{
  process.exit();
}
ctx.inputMonitors['down'] = () => {
  y += 1;
  print()
}
ctx.inputMonitors['up'] = () => {
  y -= 1;
  print()
}
ctx.inputMonitors['left'] = () => {
  x -= 1;
  print()
}
ctx.inputMonitors['right'] = () => {
  x += 1;
  print()
}

function print() {
  //text
  ctx.text(1, 2, 'WASD to move');
  ctx.text(1, 3, 'boxes to see the');
  ctx.text(1, 4, 'text be updated')
  ctx.text(1,5,"Fork and uncomment e1() to play game");

  //create 2 rectangles [x,y,width,height,style];
  var rect1 = ctx.rect(x, y, 6, 3, canvas.colors.green);
  var rect2 = ctx.rect(1, 7, 5, 3, canvas.colors.red);

  //text & collision
  if (ctx.checkCollision(rect1, rect2)) {
    ctx.text(1, 1, 'Collision Detected', canvas.colors.bold.red)
  }

  // lines
  ctx.lineSegment(0,30,19,19)
  ctx.circle(10,10,3,canvas.colors.blue);

  //draw
  ctx.tick()
}


module.exports['print'] = print;