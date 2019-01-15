var validate = require('./lib/');

module.exports = function(sails) {
  return {
    initialize: function(cb){
      sails.on('router:route', function(requestState) {
        requestState.req['validate'] = validate.bind(requestState);
      });
      return cb();
    }
  }
};
