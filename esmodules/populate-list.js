const populateList = async (e) => {
  const defaultWordListJSON = '["The", "quick", "brown", "fox"]';
  let currentWordListJSON = localStorage.getItem('currentWordListJSON');

  if (currentWordListJSON === null) {
    currentWordListJSON = defaultWordListJSON;
    localStorage.setItem('currentWordListJSON', defaultWordListJSON);
  }

  const currentWordList = JSON.parse(currentWordListJSON);
  const samePageStorageFormList = document.querySelector('.samePageStorageFormList');
  samePageStorageFormList.replaceChildren();

  currentWordList.forEach((word) => {
    const newListItem = document.createElement('li');
    newListItem.classList.add('samePageStorageFormListItem');
    newListItem.textContent = word;
    samePageStorageFormList.append(newListItem);
  });
}

window.addEventListener('storage', populateList);
window.addEventListener('DOMContentLoaded', populateList);
