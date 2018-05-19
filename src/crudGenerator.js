import response from './responseHandler'
import camelcase from './utils/camelcase'

/**
 * @description generate the crud methods for making the request
 * @param nouns {string[]|{path,name}[]} the nouns of the RESTFUL API
 * @param req {AxiosInstance} an axios request instance
 * @param method {string}
 * @param accessor {string}
 * @param res {Object}
 * @return {function(config)} the request function
 */
function generateMethod({ noun, req, method, accessor, res }) {
  return function(config = {}) {
    const newConfig = Object.assign({}, config)
    //@Todo if path is set use the path instead of noun.path
    let path = config.endpoint || noun.path
    return req({
      url: `/${path}/${newConfig.ID ? newConfig.ID : ''}`,
      ...newConfig,
      method
    })
      .then(response => {
        return res.handleThenables(
          camelcase(`${accessor}-${noun.name}`),
          accessor,
          response
        )
      })
      .catch(err => {
        return res.handleCatchables(
          camelcase(`${accessor}-${noun.name}`),
          accessor,
          err
        )
      })
  }
}

/**
 * @description used by the kunyora factory fn to generate all the  CRUD request for the nouns
 * @param req {axios} the axios request instance
 * @param config {object} the config passed to the kunyora factory function
 * @return {object}
 * @constructor
 */
export default function GenerateCrud(req, config) {
  let crud = {}
  const res = response(config)

  config.nouns.forEach(noun => {
    const methods = [
      ['get', 'get'],
      ['create', 'post'],
      ['update', 'put'],
      ['partUpdate', 'patch'],
      ['delete', 'delete']
    ]
    methods.forEach(method => {
      crud[camelcase(`${method[0]}-${noun.name}`)] = generateMethod({
        noun,
        req,
        method: method[1],
        accessor: method[0],
        res
      })
    })
  })
  return crud
}
