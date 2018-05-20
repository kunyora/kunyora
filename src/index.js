import request from './request'
import crudGenerator from './crudGenerator'
import Option from './option'
import store from './store'
import middleware from './middlewares'

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
export default function kunyoraClient(config) {
  const opt = Option(config)
  const _request = request(opt)
  const _crud = crudGenerator(_request, opt)
  const _middleware = middleware(opt)
  return { ..._crud, ..._middleware, _request, ...{ store } }
}
