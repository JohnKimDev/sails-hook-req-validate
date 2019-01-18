var should = require('should');

describe('06 Alpha Test', function () {

  it('should be 400 code alpha is required', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "alpha" parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'wefweEWFWEFWEFWEF' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('wefweEWFWEFWEFWEF');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'aaaaa' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('aaaaa');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'ASDASD' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.alpha.should.be.equal('ASDASD');
      return done();
    });
  });

  it('should be 400 code, not valid caracter added', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "alpha" parameter has an invalid input type, it should be a string with only letters (a-zA-Z).');
      return done();
    });
  });

  it('should be 400 code, not valid alpha type 1', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 'notvalidemail1' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "alpha" parameter has an invalid input type, it should be a string with only letters (a-zA-Z).');
      return done();
    });
  });

  it('should be 400 code, not valid alpha type 2', function (done) {
    sails.request({
      url: '/alpha',
      method: 'post'
    }, { alpha: 1 }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "alpha" parameter has an invalid input type, it should be a string with only letters (a-zA-Z).');
      return done();
    });
  });

});
