const EventEmitter = {
  listeners: [],
  on: function (name, callback) {
    let listeners = this.listeners[name] || (this.listeners[name] = []);
    listeners.push(callback);
  },
  off: function (name, callback) {
    callback ? 
      (this.listeners[name] = this.listeners[name].filter(callback)) :
      (this.listeners[name] = []);
  },
  trigger: function (name, ...args) {
    this.listeners[name].forEach(fn => fn.apply(this, args));
  }
};

export default EventEmitter;