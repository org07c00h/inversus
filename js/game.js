var Graphics = PIXI.Graphics;
var renderer = PIXI.autoDetectRenderer(width, height, 
    {antialiasing: false, transparent: false, resolution: 1});

document.body.appendChild(renderer.view);
renderer.backgroundColor = 0xffffff;

var scene = new PIXI.Container();

var state = setup;

var render = function() {
    renderer.render(scene);
    state();
    requestAnimationFrame(render);
}


render();

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function setup() {

    makeGrid();
    grid[17][15].changeColor();
    initPlayer();   

    state = play;
}

function play(dt) {

    updatePlayer();
}