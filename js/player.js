function initPlayer () {
    player = new Graphics();
    player.vx = 0;
    player.vy = 0;
    player.position.set(500, 500);
    player.color = white;
    player.beginFill(player.color);
    player.drawRoundedRect(0, 0, player_width, player_height, 5);
    player.endFill();
    

    var left = keyboard(65),
      up = keyboard(87),
      right = keyboard(68),
      down = keyboard(83),
      fire_up = keyboard(38),
      fire_down = keyboard(40),
      fire_left = keyboard(37),
      fire_right = keyboard(39);
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

    fire_right.press = function() {
        fire({x: 1, y: 0});
    };

    fire_left.press = function() {
        fire({x: -1, y: 0});
    };

    fire_up.press = function() {
        fire({x: 0, y: -1});
    };

    fire_down.press = function() {
        fire({x: 0, y: 1});
    };

    scene.addChild(player);
}

function updatePlayer() {
    if (player.vx != 0) {
        if (player.x + player.vx + player.width >= width) {
            player.x = width - player.width;
        } else if (player.x + player.vx <= 0) {
            player.x = 0;
        } else {
            var newX = checkPlayerGridCollistionX();
            if (newX < 0) {
                player.x += player.vx;
            } else {
                player.x = newX;
            }
        }
    }

    if (player.vy != 0) {
        if (player.y + player.vy + player.height >= height) {
            player.y = height - player.height;
        } else if (player.y + player.vy <= 0) {
            player.y = 0;
        } else {
            var newY = checkPlayerGridCollistionY();
            if (newY < 0) {
                player.y += player.vy;
            } else {
                player.y = newY;
            }
        }
    }
}


function checkPlayerGridCollistionX() {
    var grid_x;
    var x;
    if (player.vx < 0) {
        x = player.x + player.vx;
        grid_x = Math.floor(x/grid_width);
    } else {
        x = player.x + player.width + player.vx;
        grid_x = Math.floor(x/grid_width);
    }

    var grid_y1 = Math.floor(player.y/grid_height);
    var grid_y2 = Math.ceil(player.y/grid_height);

    var player_rectangle = {};
    player_rectangle.x = x;
    player_rectangle.y = player.y;
    player_rectangle.width = player.width;
    player_rectangle.height = player.height;

    if (grid[grid_x][grid_y1] !== undefined && grid[grid_x][grid_y1].color === player.color &&
        boundingBox(grid[grid_x][grid_y1], player_rectangle)) {
        
        if (player.vx > 0) {
            return grid[grid_x][grid_y1].x - player.width;
        } else {
            return grid[grid_x][grid_y1].x + grid[grid_x][grid_y1].width;
        }
    }

    if (grid[grid_x][grid_y2] !== undefined && grid[grid_x][grid_y2].color === player.color &&
        boundingBox(grid[grid_x][grid_y2], player_rectangle)) {
     
        if (player.vx > 0) {
            return grid[grid_x][grid_y2].x - player.width;
        } else {
            return grid[grid_x][grid_y2].x + grid[grid_x][grid_y2].width;
        }
    }

    return -1;
}

function checkPlayerGridCollistionY() {
    var grid_y;
    var y;
    if (player.vy < 0) {
        y = player.y + player.vy;
        grid_y = Math.floor(y/grid_height);
    } else {
        y = player.y + player.height + player.vy;
        grid_y = Math.floor(y/grid_height);
    }

    var grid_x1 = Math.floor(player.x/grid_width);
    var grid_x2 = Math.ceil(player.x/grid_width);

    var player_rectangle = {};
    player_rectangle.x = player.x;
    player_rectangle.y = y;
    player_rectangle.width = player.width;
    player_rectangle.height = player.height;

    if (grid[grid_x1][grid_y] !== undefined && grid[grid_x1][grid_y].color === player.color && 
        boundingBox(grid[grid_x1][grid_y], player_rectangle)) {
        
        if (player.vy > 0) {
            return grid[grid_x1][grid_y].y - player.height;
        } else {
            return grid[grid_x1][grid_y].y + grid[grid_x1][grid_y].height;
        }
    }

    if (grid[grid_x2][grid_y] !== undefined && grid[grid_x2][grid_y].color === player.color && 
        boundingBox(grid[grid_x2][grid_y], player_rectangle)) {
         
        if (player.vy > 0) {
            return grid[grid_x2][grid_y].y - player.height;
        } else {
            return grid[grid_x2][grid_y].y + grid[grid_x2][grid_y].height;
        }
    }

    return -1;
}

function boundingBox(rectangle1, rectangle2) {
    if (rectangle1.x < rectangle2.x + rectangle2.width &&
        rectangle1.x + rectangle1.width > rectangle2.x &&
        rectangle1.y < rectangle2.y + rectangle2.height &&
        rectangle1.height + rectangle1.y > rectangle2.y) {
        return true;
    }
    return false;
}

function fire(diraction) {
    new Bullet(diraction);
}