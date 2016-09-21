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
    this.objets = [];
    this.nodes.forEach((node) => node.clear())
    this.nodes = [];
  }

  getAllObjects(returnedObjects) {
    this.nodes.forEach((node) => node.getAllObjects(returnedObjects));
    this.objects.forEach((obj) => returnedObjects.push(obj));
    return returnedObjects;
  }

  findObjects(returnedObjects, obj) {
    if (!obj) {
      return console.log('Undefined object');
    }

    const index = this.getIndex(obj);

    if (index !== -1 && this.nodes.length) {
      this.nodes[index].findObjects(returnedObjects, obj);
    }

    this.objects.forEach((obj) => returnedObjects.push(obj));

    return returnedObjects;
  }

  insert(obj) {
    if (!obj) return;

    const self = this;

    if (obj.constructor.name === 'Array') {
      obj.forEach((objt) => self.insert(objt));
      return;
    }

    if (self.nodes.length) {
      const index = self.getIndex(obj);
      if (index !== -1) {
        self.nodex[index].insert(obj);
        return;
      }
    }

    self.objets.push(obj);

    if (self.objects.length > self.maxObjects && self.level < maxLevels) {
      if (self.nodex[0] === null) {
        self.split();
      }
      let i = 0;
      while(i < self.objets.length) {
        const obj = self.objects[i],
              index = self.getIndex(obj);
        if (index !== -1) {
          self.nodes[index].insert(self.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  getIndex(obj) {
    let index = -1;
    const verticalMidPoint = this.bounds.x + this.bounds.width/2,
          horizontalMidPoint = this.bounds.y + this.bounds.height/2;
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
    const subWidth = (this.bounds.width / 2) | 0,
          subHeight = (this.bounds.height / 2) | 0;

    this.nodes[0] = new QuadTree({
      x: this.bounds.x + subWidth,
      y: this.bounds.y,
      width: subWidth,
      height: subHeight
    }, this.level + 1);

    this.nodes[1] = new QuadTree({
      x: this.bounds.x,
      y: this.bounds.y,
      width: subWidth,
      height: subHeight
    }, this.level + 1);


    this.nodes[2] = new QuadTree({
      x: this.bounds.x,
      y: this.bounds.y + subHeight,
      width: subWidth,
      height: subHeight
    }, this.level + 1);


    this.nodes[3] = new QuadTree({
      x: this.bounds.x + subWidth,
      y: this.bounds.y + subHeight,
      width: subWidth,
      height: subHeight
    }, this.level + 1);
  }
}
