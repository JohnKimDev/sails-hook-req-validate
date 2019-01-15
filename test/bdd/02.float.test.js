var should = require('should');

describe('02 FloatController Test ::', function () {

  it('should be 400 code height is required', function (done) {
    sails.request({
      url: '/float',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The \'height\' parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/float',
      method: 'post'
    }, { height: '1.88' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/float',
      method: 'post'
    }, { height: 1.88 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.height.should.be.equal(1.88);
      return done();
    });
  });

  it('should be status 200 ok', function (done) {
    sails.request({
      url: '/float',
      method: 'post'
    }, { height: 1 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.height.should.be.equal(1);
      return done();
    });
  });

  it('should be 400 code, has to be float type', function (done) {
    sails.request({
      url: '/float',
      method: 'post'
    }, { height: '1.88m' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The \'height\' parameter has an invalid input type, it should be a float number.');
      return done();
    });
  });

});
