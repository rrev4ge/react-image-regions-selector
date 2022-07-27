/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line import/no-extraneous-dependencies
const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jquery: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    ...a11yOff,
    semi: 'error',
    // indent: 'error',
    camelcase: 'off',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'arrow-parens': ['error', 'always'],
    'no-extra-parens': 0,
    'prefer-const': 'error',
    'no-use-before-define': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-console': 'off',
    'no-useless-constructor': 'off',
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'array-callback-return': 'off',
    'no-nested-ternary': 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-plusplus': 'off',
    'linebreak-style': ['off', 'windows'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'class-methods-use-this': 'off',
    'react/no-array-index-key': 'off',
    'eslint-plugin-react/no-array-index-key': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/no-this-alias': ['off'],
    '@typescript-eslint/no-nested-ternary': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
