var should = require('should');

describe('03 StringController Test ::', function () {

  it('should be 400 code id is required', function (done) {
    sails.request({
      url: '/string',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "name" parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok 1', function (done) {
    sails.request({
      url: '/string',
      method: 'post'
    }, { name: 'joseba' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.name.should.be.equal('joseba');
      return done();
    });
  });

  it('should be status 400 invalid input check 2', function (done) {
    sails.request({
      url: '/string',
      method: 'post'
    }, { name: 12345 }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "name" parameter has an invalid input type, it should be a string.');
      return done();
    });
  });

  it('should be status 400 invalid input check 3', function (done) {
    sails.request({
      url: '/string',
      method: 'post'
    }, { name: true }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "name" parameter has an invalid input type, it should be a string.');
      return done();
    });
  });

});
