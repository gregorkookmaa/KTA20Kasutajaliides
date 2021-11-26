module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  rules: {
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'prefer-destructuring': [
      'error',
      {
        'object': true,
        'array': false
      }
    ],
    'max-len': [
      'warn',
      {
        'code': 120
      }
    ],
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
};