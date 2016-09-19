import Pool from './Pool';
import ImageRepository from './ImageRepository';
import Enemy from './Enemy';

export default class EnemyBulletPool extends Pool {
  constructor(maxSize, bulletContext) {
    const imageRepository = new ImageRepository();

    super(maxSize, bulletContext, Enemy, imageRepository.getImage('enemy'));
  }
}
