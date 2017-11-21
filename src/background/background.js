import Util from '../common/util.js';

/**
 * @see https://developer.chrome.com/extensions/runtime#event-onInstalled
 */
function onINstalled(details) {
  Util.infoLog(`onInstalled.reason:${details.reason}`);

  if (details.reason === 'install') {
    const newURL = chrome.extension.getURL('assets/settings.html');
    chrome.tabs.create({ url: newURL });
  }
}

chrome.runtime.onInstalled.addListener(onInstalled);