function makeGrid() {
    'use strickt';
    var i, j, rectangle;
    for (i = 0; i < width/grid_width; i+=1) {
        for (j = 0; j < height/grid_height; j+=1) {
            grid.push([]);

            rectangle = new Graphics();
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

            rectangle.changeColor = inverseColor;

            scene.addChild(rectangle);

            grid[i].push(rectangle);
        }
    }
}