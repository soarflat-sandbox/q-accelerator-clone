import assert from 'power-assert';

import ArticleDomHandler from '../../../src/content_scripts/article/article-dom-handler';

describe('ArticleDomHandler', function () {
  describe('getTitle()', function () {
    it('記事タイトルを取得するべき', function () {
      document.body.innerHTML = __html__['test/content_scripts/article/article.html'];
      const articleDomHandler = new ArticleDomHandler();
      assert.equal(articleDomHandler.getTitle(), 'mocha + power-assert環境の構築');
    });
  });

  describe('getLikeButtons()', function () {
    it('イイネボタンが2つ存在するべき', function () {
      document.body.innerHTML = __html__['test/content_scripts/article/article.html'];
      const articleDomHandler = new ArticleDomHandler();
      assert.equal(articleDomHandler.getLikeButtons().length, 2);
    });
  });

  describe('isLiked()', function () {
    it('イイネ済みではないべき', function () {
      document.body.innerHTML = __html__['test/content_scripts/article/article.html'];
      const articleDomHandler = new ArticleDomHandler();
      assert.equal(articleDomHandler.isLiked(), false);
    });
  });
});
