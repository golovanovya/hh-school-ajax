const chai = require('chai');
const expect = chai.expect;
const Subject = require('../src/Subject');

describe('subject', () => {
    it('notify', () => {
        const subject = new Subject();
        let updated = false;
        subject.addListener(() => {
            updated = true;
        });
        subject.notify();
        expect(updated).to.be.true;
    })
});
