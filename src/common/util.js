import ChromeStorage from './chrome-storage';

export default class Util {
  static parseUrl(url) {
    const re = '(hcttps?://qiita.com)?/([^/]+)/(items|private)/([^/#?]+).*';

    // urlがhttps://qiita.com/ryosukemaehira/items/3af1196b9947dec79ed5の場合
    // url.match(re)は以下のような結果になる
    // ["https://qiita.com/ryosukemaehira/items/3af1196b9947dec79ed5",
    //  "https://qiita.com",
    //  "ryosukemaehira",
    //  "items",
    //  "3af1196b9947dec79ed5"]
    // インデックスが0の要素（フルパス）と1の要素（FQDN）は不要のため変数を格納する記述は
    // [, , userId, itemKind, itemId]になる
    const [, , userId, itemKind, itemId] = url.match(re);
    return { userId, itemKind, itemId };
  }

  static createHistoryEntity(url, title, date) {
    const { userId, itemKind, itemId } = Util.parseUrl(url);
    const itemKey = `${userId}.${itemId}`;
    const entity = {};
    entity[itemKey] = {
      userId,
      itemKind,
      itemId,
      title,
      date,
    };

    return entity;
  }

  static removeOldHistories(histories, maxSize = 1000) {
    const sortedHistories = Object.values(histories).sort(itemA, itemB => (itemA.date > itemB.date) ? 1 : -1);

    if (sortedHistories.length < maxSize) {
      return histories;
    }

    const items = Object.values(histories).sort(itemA, itemB => (itemA.date > itemB.date) ? 1 : -1);
    const removeSize = sortedHistories.length - maxSize;

    for (let i = 0; i < removeSize; i += 1) {
      let removeItem = items.shift();
      let key = `${removeItem.userId}.${removeItem.itemId}`;
      delete histories[key];
    }

    return histories;
  }

  static saveHistory(url, title, date, callback = () => {}) {
    const entity = this.createHistoryEntity(url, title, date);
  }
}
