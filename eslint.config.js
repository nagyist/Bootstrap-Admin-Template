import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // Alpine.js
        Alpine: 'readonly',
        // External libraries
        ApexCharts: 'readonly',
        Swal: 'readonly',
        bootstrap: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow console in source — production bundles strip it via esbuild.drop in vite.config.js.
      'no-console': 'off',
      'no-case-declarations': 'off',
      eqeqeq: ['warn', 'smart'],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dist-modern/**',
      'src/**',
      '*.min.js',
    ],
  },
];
