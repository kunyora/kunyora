/**
 * Prints a warning in the console if the truthy value evaluates to false.
 *
 * @param {Boolean} truthy The truthy value
 * @param {String} message The warning message.
 * @returns {void}
 */
export default function warning(truthy, message) {
  if (process.env.NODE_ENV !== 'production' && !truthy) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message)
    }
    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message)
    } catch (e) {}
  }
}
