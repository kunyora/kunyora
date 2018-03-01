import _ from "lodash";

let Store = null;

/**
 * The Store is a simple object that contains the state of the application while
 * providing some sets of methods which make it easy to access this states and listen for store changes
 * The minimalistic internal store provided by this library is an immutable store which discourages the mutation of store values which might lead to unpredictable data values
 * [For this version] of this little API, immutability is extended conscious activity
 * but the library intends to use an immutability wrapper later in future versions of the library for better consistencies
 */
export default (Store = {
  state: {},

  callbacks: [],

  /**
   * This function takes a single callback function which it calls everytime there is a change to the store
   * It returns a function which it uses to unsubscribe the callback function from listening to store changes
   *
   * @return {Function}
   * @param {Function} callback
   */
  listen: function(callback) {
    Store.callbacks.push(callback);
    var _this = Store;
    return function() {
      _this.callbacks.splice(_this.callbacks.indexOf(callback), 1);
      callback = null;
    };
  },

  /**
   * This function accepts a callback function which it runs in an asynchronous manner
   *
   * @param {Function} func
   */
  performAsyncAction: function(func) {
    function runAsync() {
      setTimeout(() => func(Store), 0);
    }
    runAsync();
  },

  /**
   * This function dispatches and sets the state to a new value
   * Afterwhich it calls a function which runs the listening callback methods
   *
   * @param {String} action
   * @param {any} args
   */
  dispatch: function(action, args) {
    Store.state = {
      ...Store.state,
      [action]: args
    };
    Store.runCallbacks();
  },

  /**
   * This function runs the callbacks added to the store to listen to store changes
   */
  runCallbacks: function() {
    Store.callbacks.forEach(callback => {
      callback();
    });
  },

  /**
   * This functin returns a deep copy of the state to the caller method or function
   *
   * @return {Object}
   */
  getState: function() {
    return _.cloneDeep(Store.state);
  }
});
