const actionConfirmationPages = ['index', 'index2'];
const storageKeyWhiteList = ['currentWordListJSON'];
const getPage = (url) => url.split('/').pop().split('.')[0] || 'index';
const samePageStorageBroadcastChannel = new BroadcastChannel('samePageStorageBroadcastChannel');

const createSamePageStorage = () => {
  Storage.prototype.setItem_original ??= Storage.prototype.setItem;
  Storage.prototype.setItem = function (storageKey, storageValue, samePage = false) {
    Storage.prototype.setItem_original.apply(this, [storageKey, storageValue]);
    if ((Storage.prototype.storageType === 'samepagestorage')  && (samePage === true)) {
      if (storageKeyWhiteList.includes(storageKey)) {
        const [broadcastMessageType, actionOriginPage] = ['samePageStorageActivated', location.href];
        samePageStorageBroadcastChannel.postMessage({broadcastMessageType, actionOriginPage, storageKey, storageValue});
      }
    }
  };
};

const handleBroadcastChannelMessage = (e) => {
  if (e.origin !== 'https://rouninmedia.github.io') return;
  switch (e.data.broadcastMessageType) {
    case ('storageTypeChanged'):
      document.querySelector(`.option.\--${e.data.storageType}`).checked = true;
      Storage.prototype.storageType = e.data.storageType;
    break;

    case ('samePageStorageActivated'):
      const actionConfirmationPage = (getPage(e.data.actionOriginPage) === actionConfirmationPages[0]) ? actionConfirmationPages[1] : actionConfirmationPages[0];
      if (getPage(location.href) === actionConfirmationPage) {
        localStorage.setItem(e.data.storageKey, {});
        localStorage.setItem(e.data.storageKey, e.data.storageValue);
      } 
    break;
  }
}

window.addEventListener('DOMContentLoaded', createSamePageStorage);
samePageStorageBroadcastChannel.addEventListener('message', handleBroadcastChannelMessage);

export default samePageStorageBroadcastChannel;
