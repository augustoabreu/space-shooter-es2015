import Background from "./Background";

class Game {
  constructor() {
    const self = this;

    self.bgCanvas = document.getElementById('background');

    if (self.bgCanvas) {
      self.bgContext = self.bgCanvas.getContext('2d');
      self.init();
    }
  }

  init() {
    const self = this;

    self.background = new Background(0, 0, self.bgContext, self.bgCanvas.width, self.bgCanvas.height);

    self.start();
  }

  start() {
    const self = this;

    requestAnimationFrame(self.start.bind(self));

    self.background.draw();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let game = new Game();
  game.init();
})
