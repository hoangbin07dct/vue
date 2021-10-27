const webpack = require('webpack');
const paths = require('./paths');
const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
// const shouldUseSourceMap = false;

const colors = require('./npm_scripts/colors');
const license = fs.readFileSync('./license.txt', 'utf8');
// const loader = require('sass-loader');
const noticeMessage = `
${colors.yellow}****************   ${colors.white}WATCH MODE${colors.yellow}   **********************${colors.red}
    process.env.NODE_ENV : development
    Don't forget ${colors.green}npm run build

    ${colors.yellowBg}${colors.black}【watchでのJSの書換を確認】${colors.reset}

    ${colors.red}アップロード/push前に必ず ${colors.green}npm run build${colors.red}
    を実行すること。
${colors.yellow}******************************************************${colors.reset}
`;

module.exports = (env) => {
  process.env.BABEL_ENV = env.production ? 'production' : 'development';
  process.env.NODE_ENV = env.production ? 'production' : 'development';
  return {
    target: ['web', 'es5'],
    mode: process.env.NODE_ENV,
    bail: false,
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    entry: {
      bundle: ['core-js/stable', 'regenerator-runtime/runtime', 'whatwg-fetch', 'intersection-observer', './src/js/main.js']
    },
    output: {
      path: paths.appBuild,
      publicPath: `/${paths.subDirectory}`,
      filename: `${paths.assetPath}/js/[name].js`,
      chunkFilename: `${paths.assetPath}/js/[name].js`
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      version: '1.0'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              arrows: false
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        }),
        new webpack.BannerPlugin({
          banner: '',
          raw: true
        })
      ],
      splitChunks: {
        name: 'vendor',
        chunks: 'all'
      },
      runtimeChunk: false
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint'),
                formatter: require('eslint/lib/cli-engine/formatters/stylish')
              },
              loader: require.resolve('eslint-loader')
            }
          ],
          include: paths.appSrc
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: `${paths.assetPath}/media/[name].[hash:8].[ext]`
              }
            },
            {
              test: /\.(ts|tsx)$/,
              include: paths.appSrc,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                    cacheDirectory: true,
                    cacheCompression: true,
                    compact: true
                  }
                },
                {
                  loader: 'tslint-loader',
                  options: {
                    typeCheck: true,
                    fix: false,
                    emitErrors: false
                  }
                }
              ]
            },
            {
              test: /\.(js|mjs|jsx)$/,
              include: paths.appSrc,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                    cacheDirectory: true,
                    cacheCompression: true,
                    compact: true
                  }
                }
              ]
            },
            {
              test: /\.(js|mjs|jsx)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  // [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }],
                  ['@babel/preset-env'],
                  ['@babel/preset-react'],
                  ['@emotion/babel-preset-css-prop']
                ],
                plugins: [['@babel/plugin-proposal-class-properties'], ['@emotion']],
                cacheDirectory: true,
                cacheCompression: true,
                sourceMaps: false
              }
            },
            {
              test: /\.pug$/,
              exclude: /node_modules/,
              loader: 'pug-loader'
            },
            {
              test: /\.(css|scss)$/,
              use: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue']
    },
    plugins: [
      new webpack.DefinePlugin({
        // Drop Options API from bundle
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true
      }),
      new DuplicatePackageCheckerPlugin(),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: true
      }),
      new EventHooksPlugin({
        done: () => {
          if (process.env.NODE_ENV === 'production') return;
          console.log(noticeMessage);
        }
      }),
      new VueLoaderPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: '/',
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    performance: false
  };
};
