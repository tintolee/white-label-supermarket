module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','react','react-hooks'],
  extends: [
    'eslint:recommended','plugin:react/recommended','plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended','prettier',
  ],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist'],
};
