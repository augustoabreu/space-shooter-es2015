let instance = null;

export default class ImageRepository {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.images = {};
    self.loaded = false;
    this.counter = 0;
  }

  init(callback) {
    if (this.loaded) return callback && callback();
    this.callback = callback;
    this.createImages();
  }

  createImages() {
    const self = this,
          images = [{
            name: 'background',
            path: 'img/bg.png'
          }, {
            name: 'ship',
            path: 'img/ship.png'
          }, {
            name: 'bullet',
            path: 'img/bullet.png'
          }, {
            name: 'enemy',
            path: 'img/enemy.png'
          }, {
            name: 'enemyBullet',
            path: 'img/bullet_enemy.png'
          }];

    self.imagesLength = images.length;

    images.forEach(function(image) {
      const newImage = self.newImage(image.path);
      newImage.onload = self.onLoadImage.bind(self);
      self.images[image.name] = newImage;
    });
  }

  onLoadImage() {
    const self = this;
    self.counter++;
    if (self.counter === self.imagesLength) {
      self.loaded = true;
      self.callback && self.callback();
    }
  }

  newImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  }

  getImage(target) {
    return this.images[target];
  }
}
