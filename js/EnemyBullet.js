import BaseBullet from './BaseBullet';
import Ship from './Ship';
import ImageRepository from './ImageRepository';

export default class EnemyBullet extends BaseBullet {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight, target) {
    super(x, y, context, width, height, canvasWidth, canvasHeight, target);

    this.collidableWith = Ship;
  }
  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          enemyBulletImage = imageRepository.getImage('enemyBullet');

    self.context.clearRect(self.x-1, self.y-1, self.width+1, self.height+1);
    self.y -= self.speed;

    if (self.isColliding) return true;

    if (self.y >= self.canvasHeight) {
      return true;
    } else {
      self.context.drawImage(enemyBulletImage, self.x, self.y);
      return false;
    }
  }
}
