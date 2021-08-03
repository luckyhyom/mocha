const   url         = require('url'),
        querystring = require('querystring');

const   chai        = require('chai'),
        nock        = require('nock'),
        chaiHttp    = require('chai-http');


const expect = chai.expect;

chai.use(chaiHttp);

describe("nock persist test", () => {
    before("http://summer.net/sum request mocking", ()=> {
        nock('http://summer.net')
        .get('/sum')
        .query(true)
        .reply(200, (uri, req, cb)=> {
            uri = url.parse(uri);
            qs = querystring.parse(uri.query);
            cb(null, Number(qs.a) + Number(qs.b));
        })
        .persist();
    })

    it("sum test", done => {
        chai.request('http://summer.net')
        .get('/sum')
        .query({a: 2, b: 3})
        .then( res => {
            expect(res.body).to.deep.equal(5);
            done();
        })
        .catch( err => {
            console.error(err);
            done(err);
        })
    })

    it("sum test2 : 5 + 3", done => {
        chai.request('http://summer.net')
        .get('/sum')
        .query({a: 5, b: 3})
        .then( res => {
            expect(res.body).to.deep.equal(8);
            done();
        })
        .catch( err => {
            console.error(err);
            done(err);
        })
    })

    after('clean', () => {
        nock.cleanAll();
    })
})