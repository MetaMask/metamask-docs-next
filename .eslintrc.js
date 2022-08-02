module.exports = {
  root: true,

  extends: ['@metamask/eslint-config', 'next'],

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
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
