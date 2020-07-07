module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-base'],
  plugins: ['prettier'],
  rules: {
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: { multiline: true, minProperties: 5 },
      },
    ],
    'function-paren-newline': ['error', 'multiline-arguments'],
  },
};
