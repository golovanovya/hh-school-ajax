const fetch = require('node-fetch');
const MemoryStorage = require('./MemoryStorage');

module.exports = class RemoteStorage extends MemoryStorage {
    constructor(api_key) {
        super();
        this._api_key = api_key;
    }

    set movies(movies) {
        throw new Error('Method not supported');
    }

    get movies() {
        throw new Error('Method not supported');
    }

    add(movie) {
        throw new Error('Method not supported');
    }

    async find(name) {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this._api_key}&query=%22${name.toLowerCase()}%22`);
        if (!response.ok) {
            throw new Error('Request error');
        }
        const {results} = await response.json();
        return results.map(({title}) => title);
    }
}
