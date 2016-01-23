function Bullet (diraction) {
    this.speed = 5;
    this.minLenth = 30;
    this.maxLength = 50;
    this.color = player.color ^ white;
    this.diraction = diraction;
    this.update = function () {
        this.line.x += this.speed * this.diraction.x;
        this.line.y += this.speed * this.diraction.y;

        this.x += this.speed * this.diraction.x;
        this.y += this.speed * this.diraction.y;

        if (this.x >= width || this.x * this.y < 0 || this.y >= height) {
            console.log(this.line);
            scene.removeChild(this.line);
            bullets.remove(this);
        }

        var grid_x = Math.floor(Math.abs(this.x) / grid_width);
        var grid_y = Math.floor(Math.abs(this.y) / grid_height);
        if (grid[grid_x][grid_y] !== undefined) {
            if (grid[grid_x][grid_y].color != this.color) {
                grid[grid_x][grid_y].changeColor();
            }
        }
    };

    this.x = player.x + player.width / 2 + diraction.x * player.width;
    this.y = player.y + player.height / 2 + diraction.y * player.height;

    this.line = new Graphics();
    this.line.lineStyle(4, 0xBDBDBD, 1);
    this.line.moveTo(this.x, this.y);
    this.line.lineTo(this.x + diraction.x * this.minLenth, this.y + diraction.y * this.minLenth);


    bullets.push(this);
    scene.addChild(this.line);
}

function updateBullets() {
    bullets.forEach(function (bullet) {
        bullet.update();
    });
}