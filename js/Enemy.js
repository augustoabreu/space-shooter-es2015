import Drawable from './Drawable';
import ImageRepository from './ImageRepository';
import EnemyBulletPool from './EnemyBulletPool';

export default class Enemy extends Drawable {
  constructor(x, y, context, width, height, bulletPool) {
    super(x, y, context, width, height);

    const self = this;
    self.x = x;
    self.y = y;
    self.speed = 0;
    self.percentFire = .01;
    self.chance = 0;
    self.alive = false;
    self.bulletPool = bulletPool;
  }

  spawn(x, y, speed) {
    const self = this;
    self.x = x;
    self.y = y;
    self.speed = speed;
    self.speedX = 0;
    self.speedY = speed;
    self.alive = true;
    self.leftEdge = self.x - 90;
    self.rightEdge = self.x + 90;
    self.bottomEdge = self.y + 140;
  }

  draw() {
    const self = this,
          imageRepository = new ImageRepository(),
          enemyImage = imageRepository.getImage('enemy');

    self.context.clearRect(self.x - 1, self.y, self.width + 1, self.height);
    self.x += self.speedX;
    self.y += self.speedY;

    if (self.x <= self.leftEdge) {
      self.speedX = self.speed;
    } else if (self.x >= self.rightEdge + self.width) {
      self.speedX = -self.speed;
    } else if (self.y >= self.bottomEdge) {
      self.speed = 1.5;
      self.speedY = 0;
      self.y -= 5;
      self.speedX = -self.speed;
    }

    self.context.drawImage(enemyImage, self.x, self.y);

    const chance = Math.floor(Math.random() * 101);

    if (chance/100 < self.percentFire) {
      self.fire();
    }
  }

  fire() {
    const self = this;

    self.bulletPool.getOne(self.x + self.width/2, self.y + self.height, -2.5);
  }

  clear() {
    const self = this;

    self.x = 0;
    self.y = 0;
    self.speed = 0;
    self.speedX = 0;
    self.speedY = 0;
    self.alive = false;
    self.isColliding = false;
  }
}
