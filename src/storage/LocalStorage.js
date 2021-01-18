const MemoryStorage = require('./MemoryStorage')

module.exports = class LocalStorage extends MemoryStorage {
    constructor() {
        super();
        window.addEventListener('storage', (e) => {
            if (e.key === 'movies') {
                super.notify();
            }
        });
    }

    get movies() {
        const movies = JSON.parse(window.localStorage.getItem('movies')) || [];
        return movies;
    }

    set movies(movies) {
        try {
            window.localStorage.setItem('movies', JSON.stringify(movies));
            super.notify();
        } catch (e) {
            console.error(e);
            throw new Error('Error while saving movie');
        }
    }
}
