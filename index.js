module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dists/",t(t.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=(0,c.default)(e),n=(0,a.default)(t),r=new d.default,o=(0,i.default)(n,t),u=(0,v.default)(t);return Object.assign({},r,n,o,u,{store:h.default})}var u=n(2),a=r(u),s=n(5),i=r(s),l=n(8),c=r(l),f=n(10),d=r(f),p=n(11),h=r(p),b=n(13),v=r(b);e.exports=o;try{window.KunyoraClient=e.exports}catch(e){}},function(e,t,n){"use strict";function r(e){var t=(0,a.allowedReqProps)(e);return u.default.create(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=n(3),u=function(e){return e&&e.__esModule?e:{default:e}}(o),a=n(4)},function(e,t){e.exports=require("axios")},function(e,t,n){"use strict";function r(e){var t={method:!0,url:!0,baseURL:!0,transformRequest:!0,transformResponse:!0,headers:!0,params:!0,paramsSerializer:!0,data:!0,timeout:!0,withCredentials:!0,adapter:!0,auth:!0,responseType:!0,xsrfCookieName:!0,xsrfHeaderName:!0,onUploadProgress:!0,onDownloadProgress:!0,maxContentLength:!0,maxRedirects:!0,httpAgent:!0,httpsAgent:!0,proxy:!0,cancelToken:!0},n={};for(var r in e)t[r]&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0}),t.allowedReqProps=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.noun,n=e.req,r=e.method,o=e.accessor,u=e.res;return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=Object.assign({},e),i=e.endpoint||t.path;return n(a({url:"/"+i+"/"+(s.ID?s.ID:"")},s,{method:r})).then(function(e){return u.handleThenables((0,c.default)(o+"-"+t.name),o,e)}).catch(function(e){return u.handleCatchables((0,c.default)(o+"-"+t.name),o,e)})}}function u(e,t){var n={},r=(0,i.default)(t);return t.nouns.forEach(function(t){[["get","get"],["create","post"],["update","put"],["partUpdate","patch"],["delete","delete"]].forEach(function(u){n[(0,c.default)(u[0]+"-"+t.name)]=o({noun:t,req:e,method:u[1],accessor:u[0],res:r})})}),n}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=u;var s=n(6),i=r(s),l=n(7),c=r(l)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.thenables,n=e.catchables;return{handleThenables:function(e,n,r){var o=this.isNameAvailableInCallables(e,n,t),u=o.found,a=o.index,s=o.wasFoundThroughMethod;return u?s?t[Object.keys(t)[a]](r,e):t[Object.keys(t)[a]](r):r},handleCatchables:function(e,t,r){var o=this.isNameAvailableInCallables(e,t,n),u=o.found,a=o.index,s=o.wasFoundThroughMethod;if(u)return s?n[Object.keys(n)[a]](r,e):n[Object.keys(n)[a]](r);throw new Error(r)},isNameAvailableInCallables:function(e,t,n){var r={},o=Object.keys(n).map(function(e){return e.toLowerCase()}),u=o.indexOf(e.toLowerCase());if(-1!==u)r={found:!0,wasFoundThroughMethod:!1,index:u};else{var a=o.indexOf(t.toLowerCase());r=-1!==a?{found:!0,wasFoundThroughMethod:!0,index:a}:{found:!1,wasFoundThroughMethod:!1,index:-1}}return r}}}},function(e,t){e.exports=require("camelcase")},function(e,t,n){"use strict";function r(e){var t=Object.assign({},f,e);return t.nouns=u(t),t}function o(e){return e.replace(/\/+(\w)/g,function(e,t){return t.toUpperCase()})}function u(e){var t=e.nouns;return(void 0===t?[]:t).map(function(e,t){if("string"==typeof e)return a(e),{path:e,name:o(e)};if("object"===(void 0===e?"undefined":i(e))&&null!==e)return s(e),{path:e.path,name:o(e.name)};throw Error("Error: all nouns should either be a string or an object")})}function a(e,t){(0,c.default)("string"==typeof e,"property "+t+" in noun not a string"),(0,c.default)(/^[0-9a-zA-Z_\/]+$/.test(e),"property "+t+" in noun contains invalid char. alphanumeric and underscore allowed")}function s(e){var t=e.path,n=e.name;a(t,"path"),a(n,"name")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=r;var l=n(9),c=function(e){return e&&e.__esModule?e:{default:e}}(l),f={nouns:[],thenables:{},catchables:{},headers:{}}},function(e,t){e.exports=require("invariant")},function(e,t,n){"use strict";function r(){var e={};return{on:function(t,n){var r=e;r[t]=r[t]||[],r[t].push(n)},emit:function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];var u=e;if(!(t in u))return!1;u[t].forEach(function(e){return e.apply(void 0,r)})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=n(12),a=function(e){return e&&e.__esModule?e:{default:e}}(u),s=null;t.default=s={state:{},callbacks:[],listen:function(e){s.callbacks.push(e);var t=s;return function(){t.callbacks.splice(t.callbacks.indexOf(e),1),e=null}},performAsyncAction:function(e){!function(){setTimeout(function(){return e(s)},0)}()},dispatch:function(e,t){s.state=o({},s.state,r({},e,t)),s.runCallbacks()},runCallbacks:function(){s.callbacks.forEach(function(e){e()})},getState:function(){return a.default.cloneDeep(s.state)}}},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{middleware:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.useBeforeRequest,n=e.useAfterResponse;t&&(this.isUseBeforeCallbackSupplied=!0,this.useBeforeRequest=t),n&&(this.isUseAfterCallbackSupplied=!0,this.useAfterResponse=n)},isUseBeforeCallbackSupplied:!1,isUseAfterCallbackSupplied:!1,useBeforeRequest:null,useAfterResponse:null}}}]);