module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'prefer-const': 'off',
    'no-undef': 'off',
    'no-eval': 'off',
    'no-plusplus': 'off',
    'operator-assignment': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    strict: 'off',
  },
};
