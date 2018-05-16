import warning from './utils/warning'

const defaultConfig = {
  nouns: [],
  thenables: {},
  catchables: {},
  headers: {}
}

/**
 * This function re-formats the config object supplied by the user by concatenating the object with a default config
 * used by the application
 * It returns an object containing the reformatted config along with the nouns generated from the url configs supplied by the user
 *
 * @return {Object}
 * @param {object} config
 *
 */
export default function Option(config) {
  let option = Object.assign({}, defaultConfig, config)
  option.nouns = generateNouns(option)
  //@Todo validate thenables and catchables
  return option
}

/**
 * This simple function formats the path supplied by the user in the config such that it appears as if its camelCased
 * For instance, path: admin/login becomes adminLogin.
 * removes all alphabets that comes after a forward slash and replaces them by a camelCased representation of the alphabet itself
 *
 * @return {string}
 * @param {string} name
 */
function formatSlash(name) {
  return name.replace(/\/+(\w)/g, (m, p1) => p1.toUpperCase())
}

/**
 * This function generates a standard noun that the application uses internally
 * The standard noun basically has the structure {path: value, name: value}
 * It generate the standard noun by also formatting the name property using the [formatSlash] helper function
 *
 * @return {Array}
 * @param nouns {string[]|object[]}
 */
function generateNouns({ nouns = [] }) {
  return nouns.map((noun, index) => {
    if (typeof noun === 'string') {
      validateNounString(noun)
      return { path: noun, name: formatSlash(noun) }
    } else if (typeof noun === 'object' && noun !== null) {
      validateNounObject(noun)
      return { path: noun.path, name: formatSlash(noun.name) }
    } else {
      throw Error('Error: all nouns should either be a string or an object')
    }
  })
}

/**
 * This function simply validates the nouns which are of type string
 *
 * @param {string} str
 * @param {string} type
 */
function validateNounString(str, type) {
  warning(
    typeof str === 'string',
    'Error: ' + !!type
      ? `property ${type} in noun not a string`
      : `noun passed is not a string`
  )
  warning(
    /^[0-9a-zA-Z_/]+$/.test(str),
    'Error: ' + !!type
      ? `property ${type} in noun contains invalid char. alphanumeric and underscore allowed`
      : ` noun contains invalid char. alphanumeric and underscore allowed`
  )
}

/**
 * This function validates nouns of type object by using validateNounString internally
 *
 * @param {object{string, string}} param0
 */
function validateNounObject({ path, name }) {
  validateNounString(path, 'path')
  validateNounString(name, 'name')
}
