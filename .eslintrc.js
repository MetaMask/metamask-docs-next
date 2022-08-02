module.exports = {
  root: true,

  extends: ['@metamask/eslint-config', 'next'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
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
  ],
};
