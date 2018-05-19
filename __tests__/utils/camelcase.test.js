import camelcase from '../../src/utils/camelcase'

test('getPosts should be produced', () => {
  expect(camelcase(`get-posts`)).toBe('getPosts')
})
