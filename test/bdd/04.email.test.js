var should = require('should');

describe('04 EmailController Test ::', function () {

  it('should be 400 code email is required', function (done) {
    sails.request({
      url: '/email',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "email" parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/email',
      method: 'post'
    }, { email: 'joseba@seba.com' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.email.should.be.equal('joseba@seba.com');
      return done();
    });
  });

  it('should be status 200 ok, but parsed as google does', function (done) {
    sails.request({
      url: '/google-email',
      method: 'post'
    }, { email: 'joseba.google.remove.dots@gmail.com' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.email.should.be.equal('josebagoogleremovedots@gmail.com');
      return done();
    });
  });

  it('should be status 200 ok, but parsed as google does', function (done) {
    sails.request({
      url: '/google-email',
      method: 'post'
    }, { email: 'joseba.seba@notgoogle.com' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.email.should.be.equal('joseba.seba@notgoogle.com');
      return done();
    });
  });

  it('should be 400 code, not valid email type 1', function (done) {
    sails.request({
      url: '/email',
      method: 'post'
    }, { email: 'notvalidemail@' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "email" parameter has an invalid input type, it should be a valid email.');
      return done();
    });
  });

  it('should be 400 code, not valid email type 2', function (done) {
    sails.request({
      url: '/email',
      method: 'post'
    }, { email: 'not,valid@email.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "email" parameter has an invalid input type, it should be a valid email.');
      return done();
    });
  });

  it('should be 400 code, not valid email type 3', function (done) {
    sails.request({
      url: '/google-email',
      method: 'post'
    }, { email: 'notvalidemail@' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "email" parameter has an invalid input type, it should be a valid email.');
      return done();
    });
  });

  it('should be 400 code, not valid email type 4', function (done) {
    sails.request({
      url: '/google-email',
      method: 'post'
    }, { email: 'not,valid@email.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "email" parameter has an invalid input type, it should be a valid email.');
      return done();
    });
  });

});
