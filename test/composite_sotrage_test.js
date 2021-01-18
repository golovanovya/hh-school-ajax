const chai = require('chai');
const expect = chai.expect;
const MemoryStorage = require('../src/storage/MemoryStorage');
const CompositeStorage = require('../src/storage/CompositeStorage');

describe('CompositeStorage', () => {
    it('find', async () => {
        const first = new MemoryStorage(...['test 1', 'test 2', 'test 3']);
        const second = new MemoryStorage(...['test 4', 'test 5', 'test 6']);
        const storage = new CompositeStorage(first, second);
        const found1 = await storage.find('test');
        expect(found1)
            .to.be.an('array')
            .deep.equal(['test 1', 'test 2', 'test 3', 'test 4', 'test 5', 'test 6']);
        const found2 = await storage.find('1');
        expect(found2)
            .to.be.an('array')
            .deep.equal(['test 1']);
        const found3 = await storage.find('4');
        expect(found3)
            .to.be.an('array')
            .deep.equal(['test 4']);
    });
    it('empty', async () => {
        const first = new MemoryStorage(...['test 1', 'test 2', 'test 3']);
        const second = new MemoryStorage(...['test 4', 'test 5', 'test 6']);
        const storage = new CompositeStorage(first, second);
        const found = await storage.find('7');
        expect(found)
            .to.be.an('array')
            .be.empty;
    });

    it('limits', async () => {
        const movies = [...Array(12).keys()].map(item => `test ${item + 1}`);
        const first = new MemoryStorage(...movies);
        const second = new MemoryStorage(...movies);
        const storage  = new CompositeStorage(first, second);
        const found = await storage.find('test');
        expect(found)
            .to.be.an('array')
            .deep.equal(movies.slice(0, 10));
        const movies1 = [...Array(6).keys()].map(item => `test ${item + 1}`);
        const movies2 = [...Array(6).keys()].map(item => `test ${item + 5}`);
        const first1 = new MemoryStorage(...movies1);
        const second1 = new MemoryStorage(...movies2);
        const storage1  = new CompositeStorage(first1, second1);
        const found1 = await storage1.find('test');
        expect(found1)
            .to.be.an('array')
            .deep.equal(movies.slice(0, 10));
    });
});
