import fullWordList from '/samepagestorage/data/full-word-list.json' with {type: 'json'};

const updateStoredWordList = (e, fullWordList) => {
  let currentWordList = JSON.parse(localStorage.getItem('currentWordListJSON'));

  switch (e.target.classList[1]) { 
    case ('--addListItem'):
      if (currentWordList.length < fullWordList.length) {
        currentWordList.push(fullWordList[currentWordList.length]);
      }
    break;

    case ('--removeListItem'):
      if (currentWordList.length > 0) {
        currentWordList.pop();
      }
    break;
  }

  let currentWordListJSON = JSON.stringify(currentWordList);
  switch (Storage.prototype.storageType) {
    case ('samepagestorage'): localStorage.setItem('currentWordListJSON', currentWordListJSON, true); break;
    case ('storage'): localStorage.setItem('currentWordListJSON', currentWordListJSON); break;
  }
}

const buttons = [...document.querySelectorAll('.samePageStorageFormButton')];
buttons.forEach((button) => button.addEventListener('click', (e) => updateStoredWordList(e, fullWordList)));
