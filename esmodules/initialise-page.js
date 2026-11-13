const initialiseSettings = () => {
  Storage.prototype.storageType = 'storage';
  document.querySelector('.option.\--storage').checked = true;
}

window.addEventListener('DOMContentLoaded', initialiseSettings);
