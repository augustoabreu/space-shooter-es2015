import Background from './Background';
import EnemyPool from './EnemyPool';
import EnemyBulletPool from './EnemyBulletPool';
import Ship from './Ship';
import ImageRepository from './ImageRepository';
import KeyboardManager from './KeyboardManager';
import QuadTree from './QuadTree';

class Game {
  constructor() {
    const self = this,
          imageRepository = new ImageRepository();

    self.bgCanvas = document.getElementById('background');
    self.shipCanvas = document.getElementById('ship');
    self.mainCanvas = document.getElementById('main');

    if (self.bgCanvas) {
      self.bgContext = self.bgCanvas.getContext('2d');
      self.shipContext = self.shipCanvas.getContext('2d');
      self.mainContext = self.mainCanvas.getContext('2d');

      imageRepository.init(self.init.bind(self));
    }
  }

  init() {
    const self = this,
          canvasWidth = self.bgCanvas.width,
          canvasHeight = self.bgCanvas.height,
          imageRepository = new ImageRepository(),

          enemyImage = imageRepository.getImage('enemy'),

          shipImage = imageRepository.getImage('ship'),
          shipX = canvasHeight/2 - shipImage.width,
          shipY = canvasHeight/4*3 - shipImage.height*2;

    self.background = new Background(0, 0, self.bgContext, canvasWidth, canvasHeight, canvasWidth, canvasHeight);

    self.ship = new Ship(shipX, shipY, self.shipContext,
                         shipImage.width, shipImage.height,
                         canvasWidth, canvasHeight, self.mainContext);

    self.enemyBulletPool = new EnemyBulletPool(50, self.mainContext, canvasWidth, canvasHeight);
    self.enemyPool = new EnemyPool(30, self.mainContext, self.enemyBulletPool);

    const width = enemyImage.width,
          height = enemyImage.height;
    let x = 100,
        y = -height,
        spacer = y * 1.5;

    for (var i = 1; i <= 18 ; i++) {
      self.enemyPool.getOne(x, y, 2);
      x += width + 25;

      if (i % 6 === 0) {
        x = 100;
        y += spacer;
      }
    }

    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight
    });

    self.ship.draw();
    self.start();
  }

  start() {
    const self = this;

    requestAnimationFrame(self.start.bind(self));

    // self.quadTree.clear();
    // self.quadTree.insert(self.ship);
    // self.quadTree.insert(self.ship.getBulletPool().getPool());
    // self.quadTree.insert(self.enemyPool.getPool());
    // self.quadTree.insert(self.enemyBulletPool.getPool());
    //self.detectCollision();

    self.background.draw();
    self.ship.move();
    self.ship.animateBulletPool();
    self.enemyPool.animate();
    self.enemyBulletPool.animate();
  }

  detectCollision() {
    const self = this,
          objects = [];

    self.quadTree.getAllObjects(objects);

    objects.forEach((obj, i) => {
      const target = [];
      self.quadTree.findObjects(target, obj);
      target.forEach((targ, j) => {
        if (obj.collidableWith) {}
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let game = new Game();
})
