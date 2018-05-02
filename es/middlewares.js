"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * This simple function controls the middlewares of the application 
 * This contains the logic of [useBeforeRequest] and [useAfterResponse] helper functions 
 * which help in running operations before a request is handled and after a response is gotten respectively 
 * 
 * Its used in this manner 
 * ```
 *    clientInstance.middleware({useBeforeRequest: function(){
 *        // do something like setting authorization headers 
 *    }, useAfterReponse: function(response){
 *        // do something with response 
 *    }})
 * 
 * ```
 * 
 * @return {Object}
 * @param {Object} config
 */
exports.default = function (config) {
  return {
    middleware: function middleware() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          useBeforeRequest = _ref.useBeforeRequest,
          useAfterResponse = _ref.useAfterResponse;

      if (useBeforeRequest) {
        this.isUseBeforeCallbackSupplied = true;
        this.useBeforeRequest = useBeforeRequest;
      }

      if (useAfterResponse) {
        this.isUseAfterCallbackSupplied = true;
        this.useAfterResponse = useAfterResponse;
      }
    },
    isUseBeforeCallbackSupplied: false,
    isUseAfterCallbackSupplied: false,
    useBeforeRequest: null,
    useAfterResponse: null
  };
};