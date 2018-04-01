/**
 * @description create a new event emitter
 * @return {*}
 * @constructor
 */
export default function Emitter() {
  const _events = {};

  return {
    /**
     * @description creates an event listener
     * @param eventName the name of the event
     * @param callback the function to be called
     */
    on(eventName, callback) {
      const event = _events;
      event[eventName] = event[eventName] || [];
      event[eventName].push(callback);
    },

    /**
     * @description emits an event
     * @param eventName the event name
     * @param args the argument to pass the the listeners callback function
     * @return {boolean}
     */
    emit(eventName, ...args) {
      const event = _events;
      if (!(eventName in event)) return false;

      event[eventName].forEach(cb => cb(...args));
    }
  };
}
