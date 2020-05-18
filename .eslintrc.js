module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-console": "off",
    "new-cap": "off",
    "max-len": ["error", { "code": 130 }]
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
