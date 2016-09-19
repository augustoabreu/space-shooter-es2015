import Background from './Background';
import Ship from './Ship';
import ImageRepository from './ImageRepository';
import KeyboardManager from './KeyboardManager';

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

          shipImage = imageRepository.getImage('ship'),
          shipX = canvasHeight/2 - shipImage.width,
          shipY = canvasHeight/4*3 - shipImage.height*2;

    self.background = new Background(0, 0, self.bgContext, canvasWidth, canvasHeight, canvasWidth, canvasHeight);

    self.ship = new Ship(shipX, shipY, self.shipContext,
                         shipImage.width, shipImage.height,
                         canvasWidth, canvasHeight, self.mainContext);

    self.ship.draw();
    self.start();
  }

  start() {
    const self = this;

    requestAnimationFrame(self.start.bind(self));

    self.background.draw();
    self.ship.move();
    self.ship.animateBulletPool();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let game = new Game();
  game.init();
})
