import BaseBullet from './BaseBullet';
import Enemy from './Enemy';
import ImageRepository from './ImageRepository';

export default class Bullet extends BaseBullet {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight, target) {
    super(x, y, context, width, height, canvasWidth, canvasHeight, target);

    this.isCollidableWith = Enemy;
  }

  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          bulletImage = imageRepository.getImage('bullet');

    self.context.clearRect(self.x-1, self.y-1, self.width+1, self.height+1);
    self.y -= self.speed;

    if (self.isColliding) return;

    if (self.y <= 0 - self.height) {
      return true;
    } else {
      self.context.drawImage(bulletImage, self.x, self.y);
    }
  }
}
