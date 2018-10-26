process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
var knex = require('../db/connection');

const server = require('../index');

const should = chai.should();

const BASE_URL = `/api/v1/`;

chai.use(chaiHttp);

describe('authentication ', () => {
  beforeEach(function(done) {
    knex.migrate.latest().then(function() {
      return knex.seed.run().then(function() {
        done();
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  describe(`routes : ${BASE_URL}auth/ `, () => {
    describe('all-user', () => {
      it('should return all users', done => {
        chai
          .request(server)
          .get(BASE_URL + 'auth/all-user')
          .end((err, res) => {
            //   there should be no errors
            should.not.exist(err);
            // there should be a 200 status code
            res.status.should.equal(200);
            // // the response should be JSON
            res.type.should.equal('application/json');
            // // the JSON response body should have a
            // // key-value pair of {"status": "success"}
            res.body.status.should.eql('success');
            // // Test data is stable
            res.body.data.should.be.a('array');
            res.body.data.length.should.equal(2);
            // // the first object should have the right keys
            res.body.data[0].should.include.keys('id', 'username', 'password');

            done();
          });
      });
    });

    describe('user', () => {
      it('should return a single user', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/user')
          .send({username: 'flo'})
          .end((err, res) => {
            //   there should be no errors
            should.not.exist(err);
            // there should be a 200 status code
            res.status.should.equal(200);
            // // the response should be JSON
            res.type.should.equal('application/json');
            // // the JSON response body should have a
            // // key-value pair of {"status": "success"}
            res.body.status.should.eql('success');
            // // Test data is stable
            res.body.data.should.be.a('object');
            // // the first object should have the right keys
            res.body.data.should.include.keys('id', 'username', 'password');

            done();
          });
      });
    });

    describe('register', () => {
      it('should return a single user', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/register')
          .send({username: 'fab', password: 'salt'})
          .end((err, res) => {
            //   there should be no errors
            should.not.exist(err);
            // there should be a 200 status code
            res.status.should.equal(200);
            // // the response should be JSON
            res.type.should.equal('application/json');
            // // the JSON response body should have a
            // // key-value pair of {"status": "success"}
            res.body.status.should.eql('success');
            // // Test data is stable
            res.body.data.should.be.a('array');
            // // the first object should have the right keys
            res.body.data[0].should.include.keys('id', 'username', 'password');

            done();
          });
      });

      it('should register a new user', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/register')
          .send({username: 'floe', password: 'salt'})
          .end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(200);

            res.type.should.equal('application/json');
            res.body.status.should.eql('success');
            // // Test data is stable
            res.body.data.should.be.a('array');
            // // the first object should have the right keys
            res.body.data[0].should.include.keys('id', 'username', 'password');

            done();
          });
      });

      it('should throw an error if user already exists', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/register')
          .send({username: 'flo', password: 'salt'})
          .end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(500);
            res.type.should.equal('text/plain');
            res.text.should.equal('username already exists');

            done();
          });
      });
    });

    describe('login', () => {
      it('should return a user with access-token', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/login')
          .send({username: 'flo', password: 'salt'})
          .end((err, res) => {
            should.not.exist(err);

            res.status.should.equal(200);

            res.type.should.equal('application/json');
            res.body.status.should.eql('success');

            res.body.data.should.be.a('object');
            res.body.data.should.include.keys(
              'id',
              'username',
              'password',
              'token'
            );

            done();
          });
      });

      it('should return an error for wrong credentials', done => {
        chai
          .request(server)
          .post(BASE_URL + 'auth/login')
          .send({username: 'fl', password: 'salt'})
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('text/plain');
            res.text.should.equal('Invalid username or password');
          });

        chai
          .request(server)
          .post(BASE_URL + 'auth/login')
          .send({username: 'flo', password: 'sa'})
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(401);
            res.type.should.equal('text/plain');
            res.text.should.equal('Invalid username or password');
            done();
          });
      });
    });
  });
});
