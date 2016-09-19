export default class Pool {
  constructor(maxSize, targetContext, Target, targetImage, optionData) {
    this.maxSize = maxSize;
    this.pool = [];
    this.Target = Target;
    this.targetImage = targetImage;
    this.optionData = optionData;
    this.init(targetContext);
  }

  init(targetContext) {
    const Target = this.Target,
          targetImage = this.targetImage;

    for (var i = 0; i < this.maxSize; i++) {
      let target = new Target(0, 0, targetContext, targetImage.width, targetImage.height);
      this.pool[i] = target;
    }
  }

  getOne(x, y, speed) {
    const pool = this.pool,
          size = this.maxSize;
    if (!pool[size - 1].alive) {
      pool[size - 1].spawn(x, y, speed);
      pool.unshift(pool.pop());
    }
  }

  getTwo(x1, y1, speed1, x2, y2, speed2) {
    const self = this,
          pool = self.pool,
          size = self.maxSize;

    if (!pool[size - 1].alive && !pool[size - 2].alive) {
      self.getOne(x1, y1, speed1);
      self.getOne(x2, y2, speed2);
    }
  }

  animate() {
    const pool = this.pool,
          size = this.maxSize;
    for (var i = 0; i < size; i++) {
      if (pool[i].alive) {
        if (pool[i].draw()) {
          pool[i].clear();
          pool.push((pool.splice(i, 1))[0]);
        }
      } else {
        break;
      }
    }
  }
}
