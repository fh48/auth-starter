process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('routes : index', () => {
  describe('GET /api/v1/', () => {
    it('should return json', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          const {body, type, status} = res;

          should.not.exist(err);

          status.should.eql(200);

          type.should.eql('application/json');

          body.status.should.equal('success');
          body.message.should.eql('hello, world!');
          done();
        });
    });
  });
});
