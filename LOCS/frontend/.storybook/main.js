const path = require('path');
const { alias } = require('../src/lib');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal(config) {
    const aliasForStorybook = {};

    for(let key in alias) {
      aliasForStorybook[key] = path.resolve(
        __dirname, 
        '../src/' + alias[key]
      );
    }

    config.resolve.alias = {
      ...config.resolve.alias,
     ...aliasForStorybook
    };

    return config;
  },
};
