import req from "./req";
import genCrud from "./crud-gen";
import Option from "./option";
import Emitter from "./events";
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
  const _req = req(opt);
  const _emitter = new Emitter();
  const _crud = genCrud(_req, opt);
  const _middleware = middleware(opt);
  return Object.assign({}, _emitter, _req, _crud, _middleware, { store });
}

module.exports = kunyoraClient;

try {
  window.KunyoraClient = module.exports;
} catch (err) {
  // do nothing
}
