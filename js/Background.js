import Drawable from './Drawable';
import ImageRepository from './ImageRepository';

export default class Background extends Drawable {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight) {
    super(x, y, context, width, height, canvasWidth, canvasHeight);
    this.speed = 1;
  }

  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          background = imageRepository.getImage('background');

    self.y += self.speed;
    self.context.drawImage(background, self.x, self.y);
    self.context.drawImage(background, self.x, self.y - self.height);

    if (self.y >= self.height) self.y = 0;
  }
}
