require('./styles.js');
require('regenerator-runtime/runtime');
const RemoteStorage = require('./storage/RemoteStorage');
const LocalStorage = require('./storage/LocalStorage');
const CompositeStorage = require('./storage/CompositeStorage');

const suggestionInput = document.querySelector('.suggestion__input');
const suggestionList = document.querySelector('.suggestion__list');
const history = document.querySelector('.history');

const storage = new LocalStorage();
const api = new CompositeStorage(
    storage,
    new RemoteStorage(API_KEY)
);

function renderHistory() {
    history.innerHTML = storage.movies
        .slice(0, 3)
        .reduce((acc, title) => `${acc}\r\n<li class="history__item">${title}</li>`, '');
}
renderHistory();

function renderSuggestions(results) {
    suggestionList.innerHTML = results.slice(0, 10)
        .reduce((acc, title) => `${acc}\r\n<li class="suggestion__item">${title}</li>`, '');
}

suggestionInput.addEventListener('keyup', async (e) => {
    const search = e.target.value;
    if (search === '') {
        return true;
    }
    const results = await api.find(search);
    renderSuggestions(results);
    suggestionList.style.display = suggestionList.innerHTML !== '' ? 'block' : 'none';
});

document.addEventListener('click', e => {
    if ([...e.target.classList].indexOf('suggestion__input') >= 0) {
        return true;
    }
    if ([...e.target.classList].indexOf('suggestion__item') >= 0) {
        const movie = e.target.innerText;
        suggestionInput.value = '';
        storage.add(movie);
    }
    suggestionList.style.display = 'none';
});

storage.addListener(renderHistory);

suggestionInput.addEventListener('click', (e) => {
    const search = e.target.value;
    if (search === '') {
        return true;
    }
    suggestionList.style.display = suggestionList.innerHTML ? 'block' : 'none';
});
