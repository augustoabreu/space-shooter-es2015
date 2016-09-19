import Pool from './Pool';
import ImageRepository from './ImageRepository';
import EnemyBullet from './EnemyBullet';

export default class EnemyBulletPool extends Pool {
  constructor(maxSize, bulletContext) {
    const imageRepository = new ImageRepository();

    super(maxSize, bulletContext, EnemyBullet, imageRepository.getImage('enemyBullet'));
  }
}
