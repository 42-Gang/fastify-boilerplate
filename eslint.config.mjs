import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node, // Node.js 전역 변수 활성화
      },
      parser: tseslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules, // TypeScript ESLint 규칙
      'import/order': ['error', { 'newlines-between': 'always' }], // Import 정렬 규칙
      'prettier/prettier': 'error', // Prettier 규칙 적용
      indent: 'off', // Prettier가 관리하도록 Indent 규칙 비활성화
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];
