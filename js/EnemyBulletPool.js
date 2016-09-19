import Pool from './Pool';
import ImageRepository from './ImageRepository';
import EnemyBullet from './EnemyBullet';

export default class EnemyBulletPool extends Pool {
  constructor(maxSize, bulletContext, canvasWidth, canvasHeight) {
    const imageRepository = new ImageRepository(),
          options = {
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight
          };

    super(maxSize, bulletContext, EnemyBullet, imageRepository.getImage('enemyBullet'), options);
  }

  init(targetContext) {
    const targetImage = this.targetImage;

    for (var i = 0; i < this.maxSize; i++) {
      let target = new EnemyBullet(0, 0, targetContext, targetImage.width, targetImage.height, this.optionData.canvasWidth, this.optionData.canvasHeight);

      this.pool[i] = target;
    }
  }
}
