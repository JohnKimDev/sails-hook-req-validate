/*
* BehaviorController
* Controller for behaviors like what happens if we have more attrs than expec.
* If we dont have the params that we are asking for, or the types doesn't match..
*/

module.exports = {

  idRequired: function(req, res){
    if(req.validate('id')) return res.ok();
  },

  idRequiredAsync: function(req, res){
    req.validate('id', {sendResponse: false}, function(err, params){
      if(err) return res.badRequest(err);
      return res.ok();
    });
  },

  idAndNameRequired: function(req, res){
    if(req.validate(['id', 'name'])) return res.ok();
  },

  idAndNameRequiredAsync: function(req, res){
    req.validate(['id', 'name'], function(err, result){
      if(!err) return res.ok();
    });
  },

  onlyThreeParams: function(req, res){
    var params = req.validate(['id', 'name', 'surname'], { returnAllParams: false });
    if(params) return res.ok(params);
  },

  onlyThreeParamsAsync: function(req, res){
    req.validate(['id', 'name', 'surname'], { returnAllParams: false }, function(err, params){
      if(!err) return res.ok(params);
    });
  },

  byType: function(req, res){
    var params = req.validate(['name', {id: 'int', surname: 'string'}], { returnAllParams: false });
    if(params) return res.ok(params);
  },

  byTypeAsync: function(req, res){
    req.validate(['name', {id: 'int', surname: 'string'}], { returnAllParams: false }, function(err, params){
      if(!err) return res.ok(params);
    });
  },

  byTypeAndParsed: function(req, res){
    var filter = [
      'id', 'surname',
      { name: ['string', {converter: 'uppercase'} ], age : 'int', height: 'float' },
    ];
    var params = req.validate(filter);
    if(params) return res.ok(params);
  },

  byTypeAndParsedAsync: function(req, res){
    var filter = [
      'id', 'surname',
      { name: ['string', {converter: 'uppercase'}], age : 'int', height: 'float' }
    ];
    req.validate(filter, {sendResponse: false}, function(err, params){
      if(err) return res.badRequest(err);
      return res.ok(params);
    });
  },

  optionalParameter: function(req, res){
    var params = req.validate('name?');
    if(params.name) return res.ok(params); else return res.ok('empty');
  },

  optionalParameterAsync: function(req, res){
    req.validate('name?', function(err, params){
      if(params && params.name) return res.ok(params);
      if(params && !params.name) return res.ok('empty');
    });
  },

  optionalParameterByType: function(req, res){
    var params = req.validate({'name?': ['string', 'lowercase', { converter: 'uppercase' }]});
    if(params) return res.ok(params);
  },

  optionalParameterByTypeAsync: function(req, res){
    req.validate({'name?': ['string', 'lowercase', { converter: 'uppercase' }]}, function(err, params){
      if(!err) return res.ok(params);
    });
  },

  someOptionalParameters: function(req, res){
    var filter = [
      'id', 'name?',
      {'surname?': ['string', { converter: 'uppercase' }], height: 'float', 'age?': 'int'}
    ];
    var params = req.validate(filter);
    if(params) return res.json(params);
  },

  someOptionalParametersAsync: function(req, res){
    var filter = [
      'id', 'name?',
      {'surname?': ['string', { converter: 'uppercase' }], height: 'float', 'age?': 'int'}
    ];
    req.validate(filter, {sendResponse: false}, function(err, params){
      if(err) return res.badRequest(err);
      return res.json(params);
    });
  },

  errorWithNoResponse: function(req, res){
    var params = req.validate('id', {sendResponse: false});
    if(params) return res.ok(); else return res.badRequest('Custom error text');
  },

  errorWithNoResponseAsync: function(req, res){
    req.validate('id', {sendResponse: false}, function(err, params){
      if(err) return res.badRequest('Custom error text');
      return res.ok();
    });
  },

  complexNoErrorResponse: function(req, res){
    var filter = [
      'id', 'name?',
      {'surname?': ['string', { converter: 'uppercase' }], height: 'float', 'age?': 'int'}
    ];
    var params = req.validate(filter, {sendResponse: false});
    if(params) return res.ok(params); else return res.badRequest('Custom Value');
  },

  complexNoErrorResponseAsync: function(req, res){
    var filter = [
      'id', 'name?',
      {'surname?': ['string', { converter: 'uppercase' }], height: 'float', 'age?': 'int'}
    ];
    req.validate(filter, {sendResponse: false}, function(err, params){
      if(err) return res.badRequest('Custom Value');
      return res.ok(params);
    });
  },

  completeErrorObject: function(req, res){
    var filter = [
      'id', 'name?',
      {'surname?': ['string', { converter: 'uppercase' }], height: 'float', 'age?': 'int'}
    ];
    req.validate(filter, {sendResponse: false}, function(err, params){
      if(err) return res.badRequest(err);
      return res.ok(params);
    });
  }

};
