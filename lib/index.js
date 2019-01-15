const helper = require('./helper');

module.exports = function (rules, options, callback){

  // if the second parameter 'options' is function, let's treat it as a callback
  if (arguments.length === 2 && _.isFunction(options)) {
    callback = options;
    options = null;
  }
  const req = this.req;
  const res = this.res;
  const config = _.isFunction(sails.config.validate) ? sails.config.validate(req, res) : _.isPlainObject(sails.config.validate) ? sails.config.validate : {};
  const params = req.allParams();
  const parsedParams = {};
  const errors = [];
  
  // -----------------------------
  // --- Default Option Values ---
  // -----------------------------
  options = _.defaults(options, config, {
    responseMethod: res.badRequest,
    sendResponse: true,
    usePromise: false,
    returnAllParams: true,
    onErrorOutput: function (errMessage, invalidKeys) {
      return { message: errMessage, invalid: invalidKeys };
    },
    requiredErrorMessage: function(keys) {
      keys = keys || [];
      let isare = (keys.length > 1) ? 'are' : 'is';
      let s = (keys.length > 1) ? 's' : ''
      return `The '${keys.join('\, \'')}' parameter${s} ${isare} required.`;
    },
    formatErrorMessage: function(key) {
      return `The '${key}' parameter has an invalid format.`;
    },
    typeErrorMessage: function(key, typeMessage) {
      let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
      return `The '${key}' parameter should be ${a} ${typeMessage}.`;
    },
    inputErrorMessage: function(key, typeMessage) {
      let a = (typeMessage && typeMessage.length) ? /[aeiouAEIOU]/.test(typeMessage.charAt(0)) ? 'an' : 'a' : '';
      return `The '${key}' parameter has an invalid input type` + (typeMessage ? `, it should be ${a} ${typeMessage}` : '') + '.';
    },
    orInputErrorMessage: function(orKey, orTypeMessages) {
      return `Invalid input type, it should be one of the following types; ${orTypeMessages}.`;
    }
  });
  // -----------------------------

  function isOptional(keyStr) { return _.isString(keyStr) ? (keyStr.substr(-1) === '?') : false; }
  function cleanKey(keyStr) { return isOptional(keyStr) ? keyStr.substr(0, keyStr.length-1) : keyStr; }
  function isInParams(keyStr) { return _.has(req.allParams(), cleanKey(keyStr)); }
  function hasCb(cbFunc) { return (_.isFunction(cbFunc)); }
  function errorBuilder(errors, errKeys) {
    let output = '';
    if (_.isString(errors)) { output = errors; }
    else if (_.isArray(errors)) { output = _.forEach(errors, err => { output += err.trim() + ' '; }); }
    return options.onErrorOutput(output.trim(), _.uniqWith(_.compact(errKeys, _.isEqual)));
  }
  function outputReqError(keys) {
    keys = _.isArray(keys) ? keys : [keys];
    return options.requiredErrorMessage(keys);
  }
  function returnData(cb, error, data) {
    if (options.returnAllParams === true) {
      data = _.merge(params, data);
    }
    // check if has callback
    if (hasCb(cb)) {
      cb(error, data);     // no return, b/c callback also returns data
    }
    // check for Promise option
    else if (options.usePromise === true) {
      return (_.isNull(error) ? Promise.resolve(data) : Promise.reject(error));
    } 
    // otherwise return true / false
    return _.isNull(error) ? data : false; 
  }

  /*
   * CASE 1
   * ex) req.validate('myparam')  
   * Check if the rules are a simple single param and if the param exist
   */
  if ( _.isString(rules)) {
    const key = rules;
    if (isOptional(key)) {
      // OPTIONAL key
      if (isInParams(key)) {
        parsedParams[cleanKey(key)] = params[cleanKey(key)];      // <-- PASS-THOUGH DATA
      } 
    } else {
      // REQUIRED rule
      if (isInParams(key)) {
        parsedParams[cleanKey(key)] = params[cleanKey(key)];      // <-- PASS-THOUGH DATA
      } else {
        errors.push({                                             // <-- ERROR
          message: outputReqError(key),
          key: key
        });
      }
    }
  }
  /*
   * CASE 2
   * ex) req.validate({ 'myparam': 'string' }); 
   * ex) req.validate({ 'myparam1': 'string', 'myparam2': 'string' }); 
   * ex) req.validate({ 'myparam': <MIXED_VALIDATIONS> }); 
   * Check if the rules are an Object and in that case check the type of them
   */
  else if(_.isPlainObject(rules)){
    _.forEach(rules, function(value, key){
      let bOptional = false;
      if (isOptional(key)) {
        bOptional = true;
        key = cleanKey(key);
      }

      if (!isInParams(key)) {
        if (!bOptional) {
          errors.push({                                             // <-- ERROR
            message: outputReqError(key),
            key: key
          });
        }
      } else {
        let param = params[key];
        let validation = helper(options, key, value, param);
        if (validation.error) {
          validation.error = _.isArray(validation.error) ? validation.error : [validation.error];
          _.forEach(validation.error, err => {
            errors.push({                                           // <-- ERROR
              message: err,
              key: key
            });
          });
        } else {
          parsedParams[key] = validation.value;                   // <-- PASS-THOUGH DATA
        }
      }
    });
  }
  /*
   * CASE 3
   * ex) req.validate([ 'myparam' ]); 
   * ex) req.validate([{ 'myparam': 'string' }]); 
   * ex) req.validate([{ 'myparam1': 'string' }, { 'myparam2': 'string' }]); 
   * ex) req.validate([{ 'myparam': <MIXED_VALIDATIONS> }]); 
   * Check if the rules are an Array of elements
   * If the value is a String, check if it exists in the params
   * If the value is an Object, check by key/value if the type is valid
   * In the a different case, return a not valid type error
   */
  else if (_.isArray(rules)) {
    _.forEach(rules, function (rule) {
      // CASE 3a  ex) req.validate([ 'myparam' ]); 
      if (_.isString(rule)) {
        let key = rule;
        let bOptional = false;
        if (isOptional(key)) {
          bOptional = true;
          key = cleanKey(key);
        } 
        if (!isInParams(key)) {
          if (!bOptional) {
            errors.push({                                           // <-- ERROR
              message: outputReqError(key),
              key: key
            });
          }
        } else {
          parsedParams[key] = params[key];                        // <-- PASS-THOUGH DATA
        }
      }
      // CASE 3b  ex) req.validate([{ 'myparam': 'string' }]); 
      else if (_.isPlainObject(rule)) {
        _.forEach(rule, function(_value, _key){
          let bOptional = false;
          if (isOptional(_key)) {
            bOptional = true;
            _key = cleanKey(_key);
          }
          if (!isInParams(_key)) {
            if (!bOptional) {
              errors.push({                                         // <-- ERROR
                message: outputReqError(_key),
                key: _key
              });
            }
          } else {
            let param = params[_key];
            let validation = helper(options, _key, _value, param);
            if (validation.error) {
              validation.error = _.isArray(validation.error) ? validation.error : [validation.error];
              _.forEach(validation.error, err => {
                errors.push({                                           // <-- ERROR
                  message: err,
                  key: _key
                });
              });
            } else {
              parsedParams[_key] = validation.value;              // <-- PASS-THOUGH DATA
            }
          }
        });
      }
      // ERROR - Invalid rule format
      else {
        errors.push({                                             // <-- ERROR
          message: options.formatErrorMessage(rule),
          key: null
        });
        sails.log.error(rule + ' is an invalid format. Please check the document (https://www.npmjs.com/package/sails-hook-req-validate)');
      }
    });
  }
  
  // Error Handling
  if(errors.length > 0) {
    const errMsg = _.map(errors, err => err.message);
    const errKey = _.map(errors, err => err.key);
    const errorOutput = errorBuilder(errMsg.join(' '), errKey);
    if (options.sendResponse === true) {
      options.responseMethod(errorOutput);
    }
    return returnData(callback, errorOutput, null);                     // <-- RETURN ERROR
  }

  return returnData(callback, null, parsedParams);                      // <-- RETURN DATA
};
