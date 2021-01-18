const Subject = require('../Subject');

module.exports = class MemoryStorage extends Subject {
    constructor(...movies) {
        super();
        this._movies = movies;
    }

    get movies() {
        return this._movies;
    }

    set movies(movies) {
        this._movies = movies;
        super.notify();
    }

    async find(name) {
        return this.movies.filter(movie => movie.match(new RegExp(name, 'i')) !== null);
    }

    add(movie) {
        const movies = this.movies;
        if (movies.indexOf(movie) >= 0) {
            movies.splice(movies.indexOf(movie), 1);
        }
        movies.unshift(movie);
        this.movies = movies;
    }
}
