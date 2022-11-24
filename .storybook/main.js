const path = require('path');
const webpack = require('webpack');

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
      use: ['@svgr/webpack', 'file-loader'],
    });
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../src'),
    });
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ];
    config.resolve.alias['@theme'] = path.resolve(path.dirname(__dirname), 'src/theme');
    config.resolve.alias['@components'] = path.resolve(path.dirname(__dirname), 'src/components');
    config.resolve.alias['@contexts'] = path.resolve(path.dirname(__dirname), 'src/contexts');
    config.resolve.alias['@utilities'] = path.resolve(path.dirname(__dirname), 'src/utilities');
    return config;
  },
  features: {
    emotionAlias: false,
  },
  staticDirs: ['../src'],
};
