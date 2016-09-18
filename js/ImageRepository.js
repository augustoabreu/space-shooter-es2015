let instance = null;

export default class ImageRepository {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.images = {};
    this.createImages();
  }

  createImages() {
    const images = this.images;

    images.background = new Image();
    images.background.src = 'img/bg.png';
  }

  getImage(target) {
    return this.images[target];
  }
}
