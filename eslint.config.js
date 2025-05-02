const path = require('path');
const { FlatCompat } = require('@eslint/eslintrc');
const typescriptEslintParser = require('@typescript-eslint/parser');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    'cli/**/*.js',
    'env.js',
    'eslint.config.js',
    'lint-staged.config.js'
  ],
  overrides: [
    ...compat.extends('expo', 'plugin:tailwindcss/recommended', 'prettier'),
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      env: {
        es2021: true,
        node: true,
        browser: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      ],
      plugins: {
        prettier: require('eslint-plugin-prettier'),
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        'unused-imports': require('eslint-plugin-unused-imports'),
        tailwindcss: require('eslint-plugin-tailwindcss'),
        'simple-import-sort': require('eslint-plugin-simple-import-sort'),
        'react-compiler': require('eslint-plugin-react-compiler'),
      },
      rules: {
        'max-lines-per-function': ['warn', 150],
        'prettier/prettier': 'warn',
        'react/display-name': 'off',
        'react/no-inline-styles': 'off',
        'react/destructuring-assignment': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: true },
        ],
        'import/prefer-default-export': 'off',
        'import/no-cycle': ['error', { maxDepth: '∞' }],
        'tailwindcss/classnames-order': ['warn', { officialSorting: true }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
        ],
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        es2021: true,
        node: true
      },
      extends: ['eslint:recommended'],
      plugins: {
        prettier: require('eslint-plugin-prettier'),
        'unused-imports': require('eslint-plugin-unused-imports'),
        tailwindcss: require('eslint-plugin-tailwindcss'),
        'simple-import-sort': require('eslint-plugin-simple-import-sort'),
        'react-compiler': require('eslint-plugin-react-compiler'),
      },
      rules: {
        'prettier/prettier': 'warn',
        'max-params': ['error', 3],
        'max-lines-per-function': ['warn', 150],
        'no-undef': 'off', // allow Node globals
      },
    },
    // Translations override: apply JSON plugin
    {
      files: ['src/translations/*.json'],
      extends: 'plugin:i18n-json/recommended',
      rules: {
        'i18n-json/valid-message-syntax': [
          2,
          { syntax: path.resolve('./scripts/i18next-syntax-validation.js') },
        ],
        'i18n-json/valid-json': 2,
        'i18n-json/sorted-keys': [2, { order: 'asc', indentSpaces: 2 }],
        'i18n-json/identical-keys': [
          2,
          { filePath: path.resolve('./src/translations/en.json') },
        ],
        'prettier/prettier': [0, { singleQuote: true, endOfLine: 'auto' }],
      },
    },
    // Testing files override: apply Testing Library plugin
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: 'plugin:testing-library/react',
    },
  ],
};
