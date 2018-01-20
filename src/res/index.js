export default ({ thenables, catchables }) => ({
  handleThenables: function (_name, _method, _resObj) {
    let { found, index, wasFoundThroughMethod } = this.isNameAvailableInCallables(_name, _method, thenables)
    if (found) {
     return wasFoundThroughMethod ? thenables[Object.keys(thenables)[index]](_resObj, _name) : thenables[Object.keys(thenables)[index]](_resObj)
    }
    else {
      return _resObj;
    }
  },

  handleCatchables: function (_name, _method, _errorObj) {
    let { found, index, wasFoundThroughMethod } = this.isNameAvailableInCallables(_name, _method, catchables);
    if (found) {
    return  wasFoundThroughMethod ? catchables[Object.keys(catchables)[index]](_errorObj, _name) : catchables[Object.keys(catchables)[index]](_errorObj)
    }
    else {
      throw new Error(_errorObj)
    }
  },

  isNameAvailableInCallables: function (_name, _method, _callable) {
    let _result = {},
      _index = undefined,
      _tranformedArray = Object.keys(_callable).map(obj => obj.toLowerCase());

    let index = _tranformedArray.indexOf(_name.toLowerCase());
    if (index !== -1) {
      _result = { found: true, wasFoundThroughMethod: false, index };
    }
    else {
      let _methodIndex = _tranformedArray.indexOf(_method.toLowerCase());
      if (_methodIndex !== -1) {
        _result = { found: true, wasFoundThroughMethod: true, index: _methodIndex }
      }
      else {
        _result = { found: false, wasFoundThroughMethod: false, index: -1 }
      }
    }
    return _result;
  }
})

