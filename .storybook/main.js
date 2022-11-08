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
      use: ['style-loader', 'css-loader', 'postcss-loader'],
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
    config.resolve.alias['@hooks'] = path.resolve(path.dirname(__dirname), 'src/hooks');
    config.resolve.alias['@store'] = path.resolve(path.dirname(__dirname), 'src/store');
    config.resolve.alias['@graphql'] = path.resolve(path.dirname(__dirname), 'src/graphql');
    config.resolve.alias['@utilities'] = path.resolve(path.dirname(__dirname), 'src/utilities');
    config.resolve.alias['@routes'] = path.resolve(path.dirname(__dirname), 'src/routes');
    config.resolve.alias['@factories'] = path.resolve(path.dirname(__dirname), 'src/factories');
    config.resolve.fallback = {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      url: require.resolve('url'),
      ...(config.resolve.fallback || {}),
    };
    return config;
  },
  features: {
    emotionAlias: false,
  },
  staticDirs: ['../src'],
};
