let _camelcase = require('../../src/utils/camelcase')
let camelcase = _camelcase.default

test('getPosts should be produced', () => {
  expect(camelcase(`get-posts`)).toBe('getPosts')
})
