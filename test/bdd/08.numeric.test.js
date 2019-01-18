var should = require('should');

describe('06 Numeric Test', function () {

  it('should be 400 code numeric is required', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, {}, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "numeric" parameter is required.');
      return done();
    });
  });

  it('should be status 200 ok 1', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '123' }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.numeric.should.be.equal('123');
      return done();
    });
  });

  it('should be status 200 ok 2', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: 123 }, function (err, res, body) {
      if (err) return done(err);
      res.statusCode.should.be.equal(200);
      body.numeric.should.be.equal(123);
      return done();
    });
  });

  it('should be 400 code, not valid character added', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: 'htttp://badurl.com' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "numeric" parameter has an invalid input type, it should be a string contains only numbers (may contain +, -, or . symbol).');
      return done();
    });
  });

  it('should be 400 code, not valid numeric type 1', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '12311a' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "numeric" parameter has an invalid input type, it should be a string contains only numbers (may contain +, -, or . symbol).');
      return done();
    });
  });

  it('should be 400 code, not valid numeric type 2', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '1,1' }, function (err, res, body) {
      err.should.be.instanceOf(Object);
      err.status.should.be.equal(400);
      err.body.should.be.instanceOf(Object);
      err.body.message.should.be.equal('The "numeric" parameter has an invalid input type, it should be a string contains only numbers (may contain +, -, or . symbol).');
      return done();
    });
  });

  it('should be 20 code, valid numeric type 3', function (done) {
    sails.request({
      url: '/numeric',
      method: 'post'
    }, { numeric: '1.1' }, function (err, res, body) {
      res.statusCode.should.be.equal(200);
      body.numeric.should.be.equal('1.1');
      return done();
    });
  });

});
