let helpers = require('../../src/utils/helpers')
let deepClone = helpers.deepClone

let A = { name: 'Gbenga' }

test('A should remain pure and unchanged', () => {
  let b = deepClone(A)
  b.name = 'Tobi'
  expect(A).toHaveProperty('name', 'Gbenga')
})
