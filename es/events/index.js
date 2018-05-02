"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Emitter;
/**
 * @description create a new event emitter
 * @return {*}
 * @constructor
 */
function Emitter() {
  var _events = {};

  return {
    /**
     * @description creates an event listener
     * @param eventName the name of the event
     * @param callback the function to be called
     */
    on: function on(eventName, callback) {
      var event = _events;
      event[eventName] = event[eventName] || [];
      event[eventName].push(callback);
    },


    /**
     * @description emits an event
     * @param eventName the event name
     * @param args the argument to pass the the listeners callback function
     * @return {boolean}
     */
    emit: function emit(eventName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = _events;
      if (!(eventName in event)) return false;

      event[eventName].forEach(function (cb) {
        return cb.apply(undefined, args);
      });
    }
  };
}