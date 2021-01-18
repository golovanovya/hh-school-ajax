module.exports = class Subject {
    constructor() {
        this._listeners = [];
    }

    addListener(listener) {
        if (this._listeners.indexOf(listener) >= 0) {
            return true;
        }
        this._listeners.push(listener);
    }

    notify() {
        this._listeners.forEach(listener => listener());
    }
}
