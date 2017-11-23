import Util from '../../src/common/util';

describe('parse url of the Qiita domain', () => {
  test('parseUrl', () => {
    const url = 'https://qiita.com/ryosukemaehira/items/3af1196b9947dec79ed5';
    const { userId, itemKind, itemId } = Util.parseUrl(url);
    expect(userId).toBe('ryosukemaehira');
    expect(itemKind).toBe('items');
    expect(itemId).toBe('3af1196b9947dec79ed5');
  });
});
