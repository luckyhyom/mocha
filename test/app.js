const assert = require('assert');

const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const Users = [
    {
        email: "test@gmail.com",
        password: "1234",
        profile: { name: "hyom", age: 27 },
    }
];

describe("google login test", ()=> {
    before("http://google.co.kr/login request mocking", ()=> {
        nock('http://google.co.kr')
        .post('/login')
        .reply(200, (uri, req, cb) => {
            let user = Users.filter( u => u.email === req.email && u.password === req.password) [0],
            profile = user? user.profile : null;
            cb(null,profile);
        })
    })

    it("login test", done => {
        chai.request('http://google.co.kr')
        .post('/login')
        .send({email: [0].email, password: Users[0].password })
        .then( res =>{
            expect(res.body).to.deep.equal(Users[0].profile);
            done();
        })
        .catch( err => {
            console.error(err);
            done(err);
        })  
    })

    after("clean", ()=> {
        nock.cleanAll();
    })
});

