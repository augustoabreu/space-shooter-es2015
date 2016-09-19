let instance = null;

export default class KeyboardManager {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.resolveKeys();
    this.setEvents();
  }

  resolveKeys() {
    this.KEY_CODES = {
      32: 'space',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    this.KEY_STATUS = {};
    for (let code in this.KEY_CODES) {
      this.KEY_STATUS[this.KEY_CODES[code]] = false;
    }
  }

  setEvents() {
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  handleKeydown(e) {
    this.setStatus(e, true);
  }

  handleKeyup(e) {
    this.setStatus(e, false);
  }

  setStatus(e, status) {
    const keyCode = (e.keyCode || e.charCode),
          code = this.KEY_CODES[keyCode];

    if (code) {
      e.preventDefault();
      this.KEY_STATUS[code] = status;
    }
  }

  getStatus() {
    return this.KEY_STATUS;
  }
}
