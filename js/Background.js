import Drawable from './Drawable';
import ImageRepository from './ImageRepository';

export default class Background extends Drawable {
  constructor(x, y, context, canvasWidth, canvasHeight) {
    super(x, y, context, canvasWidth, canvasHeight);
    this.speed = 1;
  }

  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          background = imageRepository.getImage('background');

    self.y += self.speed;
    self.context.drawImage(background, self.x, self.y);
    self.context.drawImage(background, self.x, self.y - self.canvasHeight);

    if (self.y >= self.canvasHeight) self.y = 0;
  }
}
