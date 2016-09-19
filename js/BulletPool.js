import Pool from './Pool';
import ImageRepository from './ImageRepository';
import Bullet from './Bullet';

export default class BulletPool extends Pool {
  constructor(maxSize, bulletContext) {
    const imageRepository = new ImageRepository();

    super(maxSize, bulletContext, Bullet, imageRepository.getImage('bullet'));
  }
}
