import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },

  // ✅ JavaScript 추천 설정 적용
  pluginJs.configs.recommended,

  // ✅ TypeScript ESLint 설정을 배열이 아니라 객체로 추가해야 함
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules, // ✅ 객체로 직접 추가
    },
  },

  // ✅ Import 정렬 규칙 추가 (선택)
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
  },

  // ✅ Prettier 설정 추가
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      indent: 'off', // Prettier가 관리하도록 ESLint의 Indent 규칙 비활성화
      '@typescript-eslint/indent': 'off',
    },
  },
];
