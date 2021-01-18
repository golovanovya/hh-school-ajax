const RemoteStorage = require('../src/storage/RemoteStorage');
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('findRemote', () => {
    it('find', async () => {
        const storage = new RemoteStorage(process.env.API_KEY);
        const results = await storage.find('back');
        expect(results).to.be.an('array').not.be.empty;
    });
});
