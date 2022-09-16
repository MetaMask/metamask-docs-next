module.exports = {
  root: true,

  extends: ['@metamask/eslint-config', 'next'],

  rules: {
    'import/no-unassigned-import': [
      'error',
      {
        // allow css files to be imported as modules (for global styles)
        allow: ['**/*.css'],
      },
    ],
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/match-description': 'off',
      },
    },

    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },
  ],

  ignorePatterns: [
    'node_modules/',
    '!.eslintrc.js',
    '!.prettierrc.js',
    'dist/',
    'out/',
    'next-env.d.ts',
    'next.config.js',
    'tailwind.config.js',
  ],
};
