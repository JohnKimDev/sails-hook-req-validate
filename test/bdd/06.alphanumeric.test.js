var should = require('should');

describe('06 AlphanumericController Test ::', function () {

  it('should be 400 code alpha is required', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The \'alpha\' parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: '2i7462346723ergERGERGergerg' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('2i7462346723ergERGERGergerg');
      return done();
    });
  });

  it('should be status 200 ok, with only numbers', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: '123123123123' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('123123123123');
      return done();
    });
  });

  it('should be status 200 ok, with only alphabetics', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: 'abcdABCD' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('abcdABCD');
      return done();
    });
  });

  it('should be 200 code ok, valid alphanumeric type sending a number', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: 1 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal(1);
      return done();
    });
  });

  it('should be 400 code, not valid character added', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The \'alpha\' parameter has an invalid input type, it should be a string contains only letters and numbers.');
      return done();
    });
  });

  it('should be 400 code, not valid alphanumeric type', function (done) {
    sails.request({
      url: '/alphanumeric',
      method: 'post'
    }, { alpha: 'notvalidemail@gmail.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The \'alpha\' parameter has an invalid input type, it should be a string contains only letters and numbers.');
      return done();
    });
  });

});
