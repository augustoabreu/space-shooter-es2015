export default class Drawable {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.width = width;
    this.height = height;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.context = context;
  }

  draw() {

  }
}
