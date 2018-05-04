let OToString = Object.prototype.toString

export default class Bus {
  constructor() {
    this._maxListeners = 10
    this._events = Object.create(null)
  }

  addListener(eventName, callback) {
    if (!eventName || (typeof eventName !== 'string' && typeof eventName !== 'number')) {
      throw new TypeError(' addListener first argument must be a string or number ')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(' addListener argument must be a function ')
    }

    let events = this._events[eventName]
    if (!events) {
      this._events[eventName] = callback
    } else if (OToString.call(events) === '[object Function]') {
      let bak = events
      this._events[eventName] = [bak, callback]
    } else if (OToString.call(events) === '[object Array]') {
      this._events[eventName].push(callback)
    }
  }

  removeListener(eventName, callback) {
    if (!callback) {
      this._events[eventName] = null
      return
    }
    if (typeof callback !== 'function') {
      throw new TypeError(' removeListener argument must be a function ')
    }

    let events = this._events[eventName]
    if (!events) {
      return
    } else if (typeof events === 'function') {
      this._events[eventName] = events === callback ? null : events
      return
    } else if (OToString.call(events) === '[object Array]') {
      let index = events.findIndex(item => item === callback)
      if (index > 0) {
        this._events[eventName].splice(index, 1)
      }
      return
    }
    return
  }

  emit(eventName, params) {
    let events = this._events[eventName]
    if (!events) {
      return
    } else if (typeof events === 'function') {
      events(params)
    } else if (OToString.call(events) === '[object Array]') {
      let len = events.length
      for (let i = 0; i < len; i++) {
        events[i](params)
      }
    }
  }
}
