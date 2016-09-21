export default class Drawable {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight) {
    const self = this;

    self.x = x;
    self.y = y;
    self.speed = 0;
    self.width = width;
    self.height = height;
    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.context = context;
    self.collidableWith = "";
    self.isColliding = false;
    self.type = "";
  }

  draw() {

  }

  move() {

  }

  isCollidableWith(target) {
    return (this.isCollidableWith === target.type);
  }
}
