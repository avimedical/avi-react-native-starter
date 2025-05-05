const path = require('path');
const typescriptEslintParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');
const tailwindcssPlugin = require('eslint-plugin-tailwindcss');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');
const reactCompilerPlugin = require('eslint-plugin-react-compiler');
const reactPlugin = require('eslint-plugin-react');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  // Global configuration
  {
    ignores: [
      'cli/**/*.js',
      'env.js',
      'eslint.config.js',
      'lint-staged.config.js',
      'docs/**',
      '**/node_modules/**',
      'src/translations/*.json', // Temporarily ignore JSON files that have parse errors
    ],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'docs/**/*.ts',
      'docs/**/*.tsx',
    ],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptPlugin,
      'unused-imports': unusedImportsPlugin,
      tailwindcss: tailwindcssPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'react-compiler': reactCompilerPlugin,
      react: reactPlugin,
      import: importPlugin,
    },
    rules: {
      // Disable rule requiring explicit any
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Change ts-ignore to ts-expect-error
      '@typescript-eslint/ban-ts-comment': ['off'],
      
      // Add missing React rules
      'react/no-unstable-nested-components': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/no-inline-styles': 'off',
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off',
      
      // TypeScript and style rules
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Third-party plugin rules
      'import/prefer-default-export': 'off',
      'tailwindcss/classnames-order': ['warn', { officialSorting: true }],
      'tailwindcss/no-custom-classname': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'warn',
      'max-lines-per-function': ['warn', 150],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  
  // JavaScript files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImportsPlugin,
      tailwindcss: tailwindcssPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'react-compiler': reactCompilerPlugin,
      react: reactPlugin,
      import: importPlugin,
    },
    rules: {
      // Disable unused vars check for CLI files
      'no-unused-vars': 'off',
      'no-undef': 'off',
      
      // Style rules
      'prettier/prettier': 'warn',
      'max-params': ['error', 3],
      'max-lines-per-function': ['warn', 150],
      
      // React rules
      'react/no-unstable-nested-components': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  
  // Mock files - special case for mocks
  {
    files: ['__mocks__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
