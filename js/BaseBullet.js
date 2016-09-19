import Drawable from './Drawable';
import ImageRepository from './ImageRepository';

export default class BaseBullet extends Drawable {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight, target) {
    super(x, y, context, width, height, canvasWidth, canvasHeight);
    this.alive = false;
    this.target = target;
  }

  spawn(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  }

  clear() {
    const self = this;

    self.x = 0;
    self.y = 0;
    self.speed = 0;
    self.alive = false;
  }
}
