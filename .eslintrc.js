/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // if using TypeScript
    'plugin:prettier/recommended', // for integrating Prettier with ESLint
    'eslint-config-prettier',
  ],

  parser: '@typescript-eslint/parser', // for TypeScript support
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint', // if using TypeScript
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // not needed with TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'react/react-in-jsx-scope': 'off', // for Next.js projects
    'react/jsx-uses-react': 'off', // for React 17+ with the new JSX transform
    'react/no-unknown-property': 'off', // for React 17+ with the new JSX transform,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
