module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
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
