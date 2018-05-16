export function deepClone(aObject) {
  if (!aObject) {
    return aObject
  }

  let bObject = {}

  for (var key in aObject) {
    let _value = aObject[key]
    bObject[key] = typeof _value == 'object' ? deepClone(_value) : _value
  }

  return bObject
}
