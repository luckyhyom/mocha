const chai       = require('chai'),
      nock       = require('nock'),
      chaiHttp   = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

const ErrCode = 'AWFUL_ERROR';

describe("nock error test", () => {
  before("http://www.happykoo.net/error request mocking", () => {
    nock('http://www.happykoo.net/')
      .get('/error')
      .replyWithError({
        message: 'something awful happened',
        code: ErrCode,
      });
  });

  it("error test", done => {
    chai.request('http://www.happykoo.net')
        .get('/error')
        .catch( err => {
          expect(err.code).to.equal(ErrCode);
          done();
        })
  });
});