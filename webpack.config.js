const path = require('path');

const BACKGROUND_DIR = './src/background/';
const CONTENT_SCRIPTS_DIR = './src/content_scripts/';
const COMPONENTS_DIR = './src/components/';

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    'background/background': `${BACKGROUND_DIR}background.js`,
    'content_scripts/article-content': `${CONTENT_SCRIPTS_DIR}article-content.js`,
    'content_scripts/article-list-stream-content': `${CONTENT_SCRIPTS_DIR}article-list-stream-content.js`,
    'content_scripts/article-list-tags-content': `${CONTENT_SCRIPTS_DIR}article-list-tags-content.js`,
    'content_scripts/drafts-new-content': `${CONTENT_SCRIPTS_DIR}drafts-new-content.js`,
    'content_scripts/popular-items-content': `${CONTENT_SCRIPTS_DIR}popular-items-content.js`,
    'js/settings': `${COMPONENTS_DIR}settings.js`
  },
  output: {
    path: path.join(__dirname, 'extension/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'css-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      }, {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
    ]
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      },
    }),
  ];
} else {
  module.exports.devtool = '#source-map';
}