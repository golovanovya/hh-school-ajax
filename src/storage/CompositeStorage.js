module.exports = class CompositeStorage {
    constructor(firstStorage, secondStorage) {
        this._firstStorage = firstStorage;
        this._secondStorage = secondStorage;
    }

    async find(name) {
        if (name === '') {
            return this._firstStorage.movies.slice(0, 5);
        }
        const first = await this._firstStorage.find(name);
        const firstItems = first.slice(0, 5);
        const second = await this._secondStorage.find(name);
        const secondItems = second.filter(movie => firstItems.indexOf(movie) < 0)
        return [...firstItems, ...secondItems].slice(0, 10);
    }
}
