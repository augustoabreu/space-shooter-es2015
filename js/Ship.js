import Drawable from './Drawable';
import ImageRepository from './ImageRepository';
import BulletPool from './BulletPool';
import KeyboardManager from './KeyboardManager';
import EnemyBullet from './EnemyBullet';

export default class Ship extends Drawable {
  constructor(x, y, context, width, height, canvasWidth, canvasHeight, bulletContext) {
    super(x, y, context, width, height, canvasWidth, canvasHeight);
    this.speed = 3;
    this.bulletPool = new BulletPool(30, bulletContext);
    this.fireRate = 15;
    this.counter = 0;
    this.collidableWith = EnemyBullet;
  }

  draw() {
    const imageRepository = new ImageRepository(),
          shipImage = imageRepository.getImage('ship');

    this.context.drawImage(shipImage, this.x, this.y);
  }

  move() {
    const keyboardManager = new KeyboardManager(),
          STATUS = keyboardManager.getStatus();

    this.counter++;

    this.context.clearRect(this.x, this.y, this.width, this.height);

    if (STATUS.left || STATUS.right || STATUS.down || STATUS.up) {
      if (STATUS.left) {
        this.x -= this.speed;
        if (this.x < 0) this.x = 0;
      } else if (STATUS.right) {
        this.x += this.speed;
        if (this.x >= this.canvasWidth - this.width) {
          this.x = this.canvasWidth - this.width;
        }
      } else if (STATUS.up) {
        this.y -= this.speed;
        if (this.y <= this.canvasHeight/4*3 - this.height*2) {
          this.y = this.canvasHeight/4*3 - this.height*2;
        }
      } else if (STATUS.down) {
        this.y += this.speed;
        if (this.y >= this.canvasHeight - this.height) {
          this.y = this.canvasHeight - this.height;
        }
      }
    }

    if (!this.isColliding) {
      this.draw();
    }

    if (STATUS.space && this.counter >= this.fireRate && !this.isColliding) {
      this.fire();
      this.counter = 0;
    }
  }

  fire() {
    this.bulletPool.getTwo(this.x + 6, this.y, 3, this.x + 33, this.y, 3);
  }

  animateBulletPool() {
    this.bulletPool.animate();
  }

  getBulletPool() {
    return this.bulletPool;
  }
}
