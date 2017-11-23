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
    return {
      userId,
      itemKind,
      itemId
    };
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
    const sortedHistories = Object.values(histories).sort(itemA, itemB => (itemA.date > itemB.date)
      ? 1
      : -1);

    if (sortedHistories.length < maxSize) {
      return histories;
    }

    const items = Object.values(histories).sort((itemA, itemB) => (itemA.date > itemB.date)
      ? 1
      : -1);
    const removeSize = sortedHistories.length - maxSize;

    for (let i = 0; i < removeSize; i += 1) {
      let removeItem = items.shift();
      let key = `${removeItem.userId}.${removeItem.itemId}`;
      delete histories[key];
    }

    return histories;
  }

  static saveHistory(url, title, date, callback = () => {
  }) {
    const entity = this.createHistoryEntity(url, title, date);

    this.getHistories((histories) => {
      Object.assign(histories, entity);
      histories = this.removeOldHistories(histories);
      ChromeStorage.saveHistories(histories, () => {
        this.infoLog('閲覧履歴を保存', url);
        callback();
      });
    });
  }

  static getHistories(callback) {
    ChromeStorage.getHistories((histories) => {
      callback(histories);
    });
  }

  static clearHistories(callback = () => {
  }) {
    ChromeStorage.saveHistories({}, () => {
      this.infoLog('閲覧履歴を消去');
      callback();
    });
  }

  static saveSetting(key, value, callback = () => {
  }) {
    let entity = {};
    entity[key] = value;

    this.getSettings((settings) => {
      Object.assign(settings, entity);
      ChromeStorage.saveSettings(settings, () => {
        const message = JSON.stringify(entity);
        this.infoLog('設定を保存', message);
        callback();
      });
    });
  }

  static getSettings(callback) {
    ChromeStorage.getSettings((settings) => {
      const defaultSettings = require('./default-settings.json');
      defaultSettings['default-body-template'] = require('./default-body-template.md');
      Object.assign(defaultSettings, settings);
      callback(defaultSettings);
    });
  }

  /**
   * markdownのDiff構文を解析
   * -（マイナス）で始まる行を消す
   * +（プラス）で始まる行の+を消す
   */
  static parseDiffCode(code) {
    const lines = code.split('\n');
    const MINUS_REGEXP = /^-+.*$/;
    const PLUS_REGEXP = /^\++(.*$)/;

    const newLines = lines
      .filter(line => !MINUS_REGEXP.test(line))
      .map(line => {
        if (!PLUS_REGEXP.test(line)) return line;

        const [, newLine] = line.match(/^\++(.*$)/);
        return newLine;
      });
    return newLines.join('\n');
  }

  static infoLog(...messages) {
    messages.unshift('');
    const resultMessage = `Q Accelerator ${messages.join(' | ')}`;
    console.info(resultMessage);
  }

  static errorLog(e) {
    const messages = [
      '',
      e.message,
      e.stack
    ];
    const resultMessage = `Q Accelerator ${messages.join(' | ')}`;
    console.error(resultMessage);
  }
}
