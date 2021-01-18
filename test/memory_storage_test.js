const chai = require('chai');
const expect = chai.expect;
const MemoryStorage = require('../src/storage/MemoryStorage');

describe('storage', () => {
    it('find', async () => {
        const movies = [
            'test 1',
            'test 2',
            'test 3',
            'test 4',
        ];
        const storage = new MemoryStorage(...movies);

        expect(await storage.find('test'))
            .to.be.an('array')
            .deep.equal(movies)
            .not.be.empty;

        expect(await storage.find('1'))
            .to.be.an('array')
            .deep.equal(['test 1'])
            .not.be.empty;
        
        expect(await storage.find('6'))
            .to.be.an('array')
            .be.empty;
    });

    it('add movie', async () => {
        const storage = new MemoryStorage();

        expect(await storage.movies)
            .to.be.an('array')
            .be.empty;

        let added = false;
        storage.addListener(() => added = true);

        storage.add('test 1');

        expect(added).to.be.true;
        expect(await storage.movies)
            .to.be.an('array')
            .deep.equal(['test 1'])
            .not.be.empty;
    });
});
