module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vitest-globals/env': true
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vitest-globals/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off'
  }
};
