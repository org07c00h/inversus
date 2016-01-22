function inverseColor() {

    this.color = this.color ^ white;
    this.clear();
    this.lineStyle(1, grid_color, 1);
    this.beginFill(this.color);
    this.drawRect(0, 0, grid_width, grid_height);
    this.endFill();

}