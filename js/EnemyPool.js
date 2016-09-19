import Pool from './Pool';
import ImageRepository from './ImageRepository';
import Enemy from './Enemy';

export default class EnemyPool extends Pool {
  constructor(maxSize, bulletContext, bulletPool) {
    const imageRepository = new ImageRepository();
    super(maxSize, bulletContext, Enemy, imageRepository.getImage('enemy'), { bulletPool: bulletPool });
  }


  init(targetContext) {
    const targetImage = this.targetImage;

    for (var i = 0; i < this.maxSize; i++) {
      let target = new Enemy(0, 0, targetContext, targetImage.width, targetImage.height, this.optionData.bulletPool);

      this.pool[i] = target;
    }
  }
}
