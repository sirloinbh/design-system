// The rules come from the @sirloinbh/eslint-config package. This file only passes in the plugins installed here.
import js from '@eslint/js';
import { createConfig } from '@sirloinbh/eslint-config';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import importSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// The UI source lives in src/ (the apps use frontend/src/), so the type-aware and React rules point there.
// scripts/ holds Node scripts copied as they are from project-standards.
export default [
  ...createConfig(
    { js, tseslint, globals, reactHooks, reactRefresh, jsxA11y, importSort, prettier },
    {
      ignores: ['scripts/**'],
      frontendFiles: '{src,stories,showcase}/**/*.{ts,tsx}',
      typedFiles: [
        'src/**/*.{ts,tsx}',
        'stories/**/*.{ts,tsx}',
        'showcase/**/*.ts',
        '*.config.ts',
        '.storybook/**/*.{ts,tsx}',
      ],
      tsconfigRootDir: import.meta.dirname,
    },
  ),
  // Storybook needs a default export in story files and in its config files.
  {
    files: ['stories/**/*.stories.tsx', '.storybook/*.{ts,tsx}'],
    rules: { 'no-restricted-syntax': 'off' },
  },
];
