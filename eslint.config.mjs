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

import { iconImportConfig } from './src/lib/icon-rules.mjs';

// The UI source lives in src/ (the apps use frontend/src/), so the type-aware and React rules point there.
// scripts/ and the sync-owned paths (.standards/, .claude/, .codex/, .vscode/, skills/) are copied as they are from
// project-standards, so they are not linted here.
export default [
  ...createConfig(
    { js, tseslint, globals, reactHooks, reactRefresh, jsxA11y, importSort, prettier },
    {
      ignores: [
        'scripts/**',
        'delivery/ui/**',
        '.standards/**',
        '.claude/**',
        '.codex/**',
        '.vscode/**',
        'skills/**',
      ],
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
  // Input (src/components/ui) renders a native <input>, so a <label> wrapping it counts as labelled (the apps set the same).
  { settings: { 'jsx-a11y-x': { components: { Input: 'input' } } } },
  // Storybook needs a default export in story files and in its config files.
  {
    files: ['stories/**/*.stories.tsx', '.storybook/*.{ts,tsx}'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  // One icon per meaning (#70): a lucide-react icon the map in src/lib/icons.ts covers is imported from there.
  iconImportConfig({ files: ['src/**/*.{ts,tsx}'], ignores: ['src/lib/icons.ts'] }),
];
