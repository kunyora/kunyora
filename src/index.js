import requestOptions from "./requestOptions";
import crudGenerator from "./crudGenerator";
import Option from "./option";
import store from "./store";
import middleware from "./middlewares";

/**
 * This function is used to create the client instance. It accepts an object of configs
 * and formats them to return a client instance
 *
 * Used in the form
 * ```
 *    const clientInstance = kunyoraClient({...config})
 *
 * ```
 *
 * @return {object}
 * @param {object} config
 */
function kunyoraClient(config) {
  const opt = Option(config);
  const _requestOptions = requestOptions(opt);
  const _crud = crudGenerator(_requestOptions, opt);
  const _middleware = middleware(opt);
  return { ..._crud, ..._middleware, ...{ store } };
}

module.exports = kunyoraClient;

try {
  window.KunyoraClient = module.exports;
} catch (err) {
  // do nothing
}
