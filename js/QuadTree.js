export default class QuadTree {
  constructor(boundBox, lvl) {
    this.bounds = boundBox || {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.level = lvl || 0;
    this.maxObjects = 10;
    this.objects = [];
    this.nodes = [];
    this.maxLevels = 5;
  }

  clear() {
    this.objects = [];
    this.nodes.forEach(node => node.clear());
    this.nodes = [];
  }

  getAllObjects(returnedObjects) {
    this.nodes.forEach(node => node.getAllObjects(returnedObjects));
    this.objects.forEach(obj => returnedObjects.push(obj));
    return returnedObjects;
  }

  findObjects(returnedObjects, obj) {
    if (!obj) {
      return console.log('Undefined object');
    }

    const self = this,
          index = self.getIndex(obj);

    if (index !== -1 && self.nodes.length) {
      self.nodes[index].findObjects(returnedObjects, obj);
    }

    self.objects.forEach(obj => returnedObjects.push(obj));

    return returnedObjects;
  }

  insert(obj) {
    if (!obj) return;

    const self = this;

    if (obj.constructor.name === 'Array') {
      obj.forEach(objt => self.insert(objt));
      return;
    }

    if (self.nodes.length) {
      const index = self.getIndex(obj);
      if (index !== -1) {
        self.nodes[index].insert(obj);
        return;
      }
    }

    self.objects.push(obj);

    if (self.objects.length > self.maxObjects && self.level < self.maxLevels) {
      if (!self.nodes[0]) {
        self.split();
      }
      let i = 0;
      while(i < self.objects.length) {
        const obj = self.objects[i],
              index = self.getIndex(obj);
        if (index !== -1) {
          self.nodes[index].insert((self.objects.splice(i, 1))[0]);
        } else {
          i++;
        }
      }
    }
  }

  getIndex(obj) {
    let index = -1;
    const bounds = this.bounds,
          verticalMidPoint = bounds.x + bounds.width/2,
          horizontalMidPoint = bounds.y + bounds.height/2,
          topQuadrant = (obj.y < horizontalMidPoint && obj.y + obj.height < horizontalMidPoint),
          bottomQuadrant = (obj.y > horizontalMidPoint);

    if (obj.x < verticalMidPoint && obj.x + obj.width < verticalMidPoint) {
      if (topQuadrant) index = 1;
      if (bottomQuadrant) index = 2;
    } else if (obj.x > verticalMidPoint) {
      if (topQuadrant) index = 0;
      if (bottomQuadrant) index = 3;
    }

    return index;
  }

  split() {
    const self = this,
          bounds = self.bounds,
          subWidth = (bounds.width / 2) | 0,
          subHeight = (bounds.height / 2) | 0;

    self.nodes[0] = new QuadTree({
      x: bounds.x + subWidth,
      y: bounds.y,
      width: subWidth,
      height: subHeight
    }, self.level + 1);

    self.nodes[1] = new QuadTree({
      x: bounds.x,
      y: bounds.y,
      width: subWidth,
      height: subHeight
    }, self.level + 1);


    self.nodes[2] = new QuadTree({
      x: bounds.x,
      y: bounds.y + subHeight,
      width: subWidth,
      height: subHeight
    }, self.level + 1);


    self.nodes[3] = new QuadTree({
      x: bounds.x + subWidth,
      y: bounds.y + subHeight,
      width: subWidth,
      height: subHeight
    }, self.level + 1);
  }
}
