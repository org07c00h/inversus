function makeGrid() {
    for (var i = 0; i < width/grid_width; i++) {
        for (var j = 0; j < height/grid_height; j++) {
            grid.push([]);

            var rectangle = new Graphics();
            rectangle.lineStyle(1, grid_color, 1);
            if ( j < 10) {
                rectangle.color = white;    
            } else {
                rectangle.color = black;
            }

            rectangle.position.set(i*grid_width, j*grid_height);
            rectangle.beginFill(rectangle.color);
            rectangle.drawRect(0, 0, grid_width, grid_height);
            rectangle.endFill();
            
            rectangle.x_ = i*grid_width;
            rectangle.y_ = j*grid_height;
            rectangle.changeColor = function()
            {
                this.color = ~this.color;
                this.clear();
                this.lineStyle(1, grid_color, 1);
                this.beginFill(this.color);
                this.drawRect(this.x_, this.y_, grid_width, grid_height);
                this.endFill();
            };

            scene.addChild(rectangle);

            grid[i].push(rectangle);
        }
    }
}

function initPlayer () {
    player = new Graphics();
    player.vx = 0;
    player.vy = 0;
    player.position.set(500, 500);
    player.color = white;
    player.beginFill(player.color);
    player.drawRoundedRect(0, 0, grid_width, grid_height, 5);
    player.endFill();
    

    var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
//Left arrow key `press` method
    left.press = function() {
        player.vx = -5;
        
    };

    //Left arrow key `release` method
    left.release = function() {
        if (!right.isDown) {
          player.vx = 0;
        }
    };

    //Up
    up.press = function() {
        player.vy = -5;

    };
    up.release = function() {
        if (!down.isDown) {
          player.vy = 0;
      }
    };

    //Right
    right.press = function() {
        player.vx = 5;
    };

    right.release = function() {
        if (!left.isDown) {
          player.vx = 0;
        }
    };

    //Down
    down.press = function() {
        player.vy = 5;
    };

    down.release = function() {
        if (!up.isDown) {
          player.vy = 0;
    }
    };

    scene.addChild(player);
}