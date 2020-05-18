module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    describe: false,
    test: false,
    expect: false,
    jest: false,
    afterEach: false,
    beforeAll: false,
    afterAll: false,
  },
};
