import assert from 'power-assert';

import ArticleDomHandler from '../../../src/content_scripts/article/article-dom-handler';

describe('ArticleDomHandler', function () {
  describe('getTitle()', function () {
    it('記事タイトルを取得する', function () {
      document.body.innerHTML = __html__['test/content_scripts/article/article.html'];
      const articleDomHandler = new ArticleDomHandler();
      assert.equal(articleDomHandler.getTitle(), 'webpack 入門 （v3系 対応）');
    });
  });
});
