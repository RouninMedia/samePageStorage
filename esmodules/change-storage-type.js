import samePageStorageBroadcastChannel from './esmodules/same-page-storage-broadcast-channel.js';

const optionsFieldset = document.querySelector('.samePageStorageFormFieldset.\--options');

const changeStorageType = () => {
  const broadcastMessageType = 'storageTypeChanged';
  Storage.prototype.storageType = document.querySelector('.option:checked').value; 
  samePageStorageBroadcastChannel.postMessage({broadcastMessageType, storageType: Storage.prototype.storageType});

  let currentWordListJSON = localStorage.getItem('currentWordListJSON');
  switch (Storage.prototype.storageType) {
    case ('samepagestorage'): localStorage.setItem('currentWordListJSON', currentWordListJSON, true); break;
    case ('storage'): localStorage.setItem('currentWordListJSON', currentWordListJSON); break;
  }
}

optionsFieldset.addEventListener('change', changeStorageType);
