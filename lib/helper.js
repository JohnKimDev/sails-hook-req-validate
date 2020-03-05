/*
* helper - Function
* @description: Helper in validation types
*/

const validator = require('./validator');

module.exports = function(options, key, validations, param) {

  function cleanVal(str) { return str.replace(/\s/g, '').toLowerCase(); }
  const errors = [];

  // CASE 1
  // req.validate( { 'myparam': 'string' });
  if (_.isString(validations)) {
    return validator.stringValidationCheck(options, key, cleanVal(validations), param);
  }
  // CASE 2
  // req.validate( { 'myparam': (val) => { return val === 1 } });
  else if (_.isFunction(validations)) {
     try {
       const test = validations(param);
       if (!_.isBoolean(test)) {
         return { error: 'The validation response must be boolean.' };
       }
       return test ? { value: param } : { error: 'The validation failed' };
     } catch (e) {
       return  { error: 'unexpected error' }
     }
  }
  // CASE 3
  // req.validate( { 'myparam': { enum: [ 'a', 'b', 'c'], default: 'a', convert: false });
  else if (_.isPlainObject(validations)) {
    return validator.mixedValidationsCheck(options, key, validations, param);
  }
  // CASE 4 (CASE 1 + CASE 3)
  // req.validate( { 'myparam': ['string', { enum: [ 'a', 'b', 'c'], default: 'a', convert: false }]);
  else if (_.isArray(validations)) {
    // find non-string validations
    let objectValidationsArray = _.filter(validations, item => _.isPlainObject(item));
    let mergedValidation = {};
    for (let i=0; i<objectValidationsArray.length; i++) {
      mergedValidation = _.merge(mergedValidation, objectValidationsArray[i]);
    }
    const shouldSkipConverter = (mergedValidation.converter === false);

    // find the validation string
    let foundValidations = _.filter(validations, item => _.isString(item));

    if (_.isArray(foundValidations) && foundValidations.length > 0) {
      let hasError = false;
      let check;
      for (let i = 0; i < foundValidations.length; i++) {
        check = validator.stringValidationCheck(options, key, cleanVal(foundValidations[i]), param, shouldSkipConverter);
        if (check.error) {
          errors.push(check.error);
          hasError = true;
        }
      }

      if (!hasError && check) {
        param = check.value;      // in case the param has been updated thought converter.
      }
      else {
        _.forEach(foundValidations, item => {
          errors.push(item.message);
        });
      }
    }

    // CASE 4a
    // req.validate( { 'myparam': ['string', { enum: [ 'a', 'b', 'c']}, { default: 'a', convert: false }]);
    let mixedCheck = validator.mixedValidationsCheck(options, key, mergedValidation, param);
    if (_.has(mixedCheck, 'value')) {
      param = mixedCheck.value;
    }

    // check errors and return
    if (errors.length > 0) {
      return { error: errors };
    }
    return { value: param };
  } else {
    sails.log.error(key + ' has an invalid format. Please check the document (https://www.npmjs.com/package/sails-hook-req-validate)');
    return { error: key + ' has an invalid format.' }
  }
}

