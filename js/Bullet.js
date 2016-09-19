import BaseBullet from './BaseBullet';
import ImageRepository from './ImageRepository';

export default class Bullet extends BaseBullet {

  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          bulletImage = imageRepository.getImage('bullet');

    self.context.clearRect(self.x-1, self.y-1, self.width+1, self.height+1);
    self.y -= self.speed;

    if (self.y <= 0 - self.height) {
      return true;
    } else {
      self.context.drawImage(bulletImage, self.x, self.y);
    }
  }
}
