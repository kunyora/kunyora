var _store = require('../src/store')
var store = _store.default

beforeEach(() => {
  store.callbacks = []
  store.state = {}
})

describe('Verify type reference of state', () => {
  test('state of store should be an object', () => {
    expect(store.state).toBeInstanceOf(Object)
  })

  test('Object should be returned from getState call', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })
})

test('store should subscribe 2 function calls', () => {
  let _fn = jest.fn()
  store.listen(_fn)
  store.listen(_fn)
  expect(store.callbacks.length).toBe(2)
})

test('store should unsubscribe a function and callback should contain one function', () => {
  let _fn = jest.fn()
  store.listen(_fn)
  let unsubscribe = store.listen(_fn)
  unsubscribe()
  expect(store.callbacks.length).toBe(1)
})

test('store should add key name to state', () => {
  store.dispatch('name', { age: 50 })
  expect(store.getState()).toHaveProperty('name')
})

test('store should call function once after dispatching action', () => {
  let _fn = jest.fn()
  store.listen(_fn)
  store.dispatch('school', { name: 'futa' })
  expect(_fn).toHaveBeenCalledTimes(1)
})
