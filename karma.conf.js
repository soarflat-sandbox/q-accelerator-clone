module.exports = function (config) {
  config.set({
    // filesやexcludeオプションなどのパターンを解決するために利用されるベースパス
    basePath: '',

    files: [
      'test/**/*.test.js',
      'test/**/*.html'
    ],

    preprocessors: {
      'test/**/*.test.js': ['webpack'],
      'test/**/**.html': ['html2js']
    },

    // テストを実行するブラウザ
    browsers: ['Chrome'],

    // 使用するテスティングフレームワーク
    frameworks: ['mocha'],

    // テスト結果を装飾するreporterの種類
    reporters: ['mocha'],

    webpack: {},

    webpackMiddleware: {
      noInfo: true,
    },

    port: 9876,

    colors: true,

  });
};