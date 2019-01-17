const V = require('validator');
const valTypes = require('./validationTypes');

module.exports = (function() {

  function checkValidation(options, sKey, sValidationType, sParam, shouldSkipconverter = false) {
    sValidationType= sValidationType.toLowerCase();    // change to all lower case to match
    const typesList = valTypes.types[sValidationType];
    if (!typesList) {
      return { error: options.formatErrorMessage(sKey) };
    }

    // sParam = '' + sParam;   // force to be a string type, in case the param has been ran though another converter
    const method = typesList.method;
    const converter = typesList.converter;
    if (_.isFunction(method) ? method(sParam) : V[method]('' + sParam)) { // ('' + sParam) = force to be a string type, in case the param has been ran though another converter
      if (shouldSkipconverter === true) {
        return { value: sParam }
      }
      return { value: _.isFunction(converter) ? converter('' + sParam) : sParam };
    }
    return { error: options.inputErrorMessage(sKey, typesList.message) }
  }
  
  function sanitizeValue(converter, param) {
    if (_.isString(converter) && valTypes.converters[converter.toLowerCase()] && _.isFunction(valTypes.converters[converter.toLowerCase()].converter)) {
      return valTypes.converters[converter.toLowerCase()].converter(param);
    } else if (_.isFunction(converter)) {
      return converter(param);
    }
    return param;
  }

  function checkSanitizeValue(converter, param) {
    let updatedParam = param;
    if (_.isArray(converter)) {
      _.forEach(converter, function(item) {
        updatedParam = sanitizeValue(item, updatedParam);
      });
    } else if (updatedParam) {
      updatedParam = sanitizeValue(converter, updatedParam);
    }
    return updatedParam;
  }


  // ### Validation Type Check (validation = string)
  const stringValidationCheck = function (options, key, validation, param, shouldSkipconverter = false) {
    // Check OR operator
    if (validation.indexOf('|')<0) {
      // Single string validation
      return checkValidation(options, key, validation, param, shouldSkipconverter);
    }
    // has one more more OR operators
    const orErrorTypes = [];
    const orValidations = validation.replace(/\s/g, '').split('|');
    let updatedParam = param
    let isOk = false;
    let errStr = '';
    _.forEach(orValidations, function(val) {
      let check = checkValidation(options, key, val, updatedParam, shouldSkipconverter);
      errStr += (valTypes.types[val] ? valTypes.types[val].message + ' ' : '');
      if (check.error) {
        errStr += check.error + ' ';
      } else {
        isOk = true;
        updatedParam = check.value;   // updated checked param in case it has ran thought convertor(s)
      }
    });
    if (!isOk) {
      return { error: options.orInputErrorMessage(key, errStr) };
    }
    // every is good
    return { value: updatedParam, error: null }; 
  };

  // Mixed validations check (validations = {})
  const mixedValidationsCheck = function (options, key, validations, param) {
    if (_.isEmpty(validations)) {
      return { value: param };
    }

    validations = _.defaults(validations, {
      validator: undefined,
      enum: undefined,
      default: undefined,
      converter: undefined
    })
    // custom type
    if (validations.validator && _.isFunction(validations.validator)) {
      if (validations.validator(param)) {
        return { value: checkSanitizeValue(validations.converter, param) };
      }
    }
    // enum
    else if (validations.enum) {
      // if the param is in enum
      if (validations.enum.indexOf(param) >= 0) {
        return { value: checkSanitizeValue(validations.converter, param) };
      } 
    }
    // if the param undefined BUT has a default value
    else if (_.isUndefined(param) && !_.isUndefined(validations.default)) {
      return { value: checkSanitizeValue(validations.converter, validations.default) };
    }
    // converter
    else if (!_.isUndefined(validations.converter)) {
      return { value: checkSanitizeValue(validations.converter, param) };
    }
  };

  return {
    stringValidationCheck: stringValidationCheck,
    mixedValidationsCheck: mixedValidationsCheck
  }
})();