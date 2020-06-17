module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 0,
    'no-useless-catch': 'off',
    'dot-notation': [0, { allowKeywords: true }],
    'space-before-function-paren': [2, 'never'],
    'template-curly-spacing': [2, 'always']
  }
}
