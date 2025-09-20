import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
    ignores: [
      'dist/',
      'node_modules/',
      '*.config.js',
      '*.config.ts',
      'apps/*/dist/',
      'packages/*/dist/',
      'tools/*/dist/',
      'debug_cases.js',
      'test_*.js',
      'test_*.html',
      'scripts/test-*.js',
      'browser_diagnostic.js',
      'diagnostic_script.js',
      'final_solution.js',
      'fix_config_contradiction.js',
      'root_cause_analysis.js',
      'verify_api_config.js',
    ],
  }
);
