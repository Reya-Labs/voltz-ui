const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: '@svgr/webpack',
    });
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });
    config.resolve.alias['@theme'] = path.resolve(path.dirname(__dirname), 'src/theme');
    config.resolve.alias['@components'] = path.resolve(path.dirname(__dirname), 'src/components');
    return config;
  },
};
